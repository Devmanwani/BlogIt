import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import {sign, verify} from 'hono/jwt';
import {SignUpInput, SignInInput} from '@devmanwani/blog';



const colors = [
    '#333333',  // Dark Gray
    '#9932CC',  // Dark Orchid
    '#8A2BE2',  // Blue Violet
    '#800000',  // Maroon
    '#8B4513',  // Saddle Brown
    '#2F4F4F',  // Dark Slate Gray
    '#483D8B',  // Dark Slate Blue
    '#000080',  // Navy
    '#00008B',  // Dark Blue
    '#4B0082',  // Indigo
    '#2E8B57',  // Sea Green
    '#556B2F',  // Dark Olive Green
    '#008080',  // Teal
    '#800080',  // Purple
    '#A52A2A'   // Brown
];

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const bodyResult = SignUpInput.safeParse(await c.req.json());

    if (!bodyResult.success) {
        return c.json({ error: bodyResult.error });
    }

    const body = bodyResult.data;

    try {
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const user = await prisma.user.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: body.password,
                color: randomColor  
            }
        });

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt });
    } catch(e) {
        c.status(403);
        return c.json({ error: "error while signing up" });
    }
});



userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  
  const bodyResult = SignInInput.safeParse(await c.req.json());

  
  if (!bodyResult.success) {
   
    return c.json({ error: bodyResult.error });
  }

  const body = bodyResult.data;
  
  try {
    
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      },
    });

   
    if (!user) {
      c.status(403);
      return c.json({ error: "User not found" });
    }
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt });
    
  } catch (e) {
   
    console.error('Error signing in user:', e);
    c.status(500);
    return c.json({ error: "Error signing in user" });
  }
});

userRouter.get('/getUser', async (c)=>{

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];

  try {
    const response = await verify(token, c.env.JWT_SECRET);
    if (!response.id) {
        throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: response.id
      },
    });

    return c.json({
      id:response.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      color:user?.color
    })

    
} catch (error) {
    
    return new Response("Unauthorized", { status: 403 });
}
})
