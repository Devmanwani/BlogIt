import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import {sign, verify} from 'hono/jwt';
import {SignUpInput, SignInInput} from '@devmanwani/blog';




export const adminRouter  = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();


adminRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  
  const bodyResult = SignInInput.safeParse(await c.req.json());

  
  if (!bodyResult.success) {
   
    return c.json({ error: bodyResult.error });
  }

  const body = bodyResult.data;
  
  try {
    
    const user = await prisma.admin.findUnique({
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

adminRouter.get('/getUser', async (c)=>{

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
    
    const user = await prisma.admin.findUnique({
      where:{
        id: response.id
      }
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

adminRouter.get('/getUsers', async (c)=>{

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
      
      const users = await prisma.user.findMany({});
  
      return c.json(users);
  
      
  } catch (error) {
      
      return new Response("Unauthorized", { status: 403 });
  }
  })

  adminRouter.delete('/getUser/:id', async (c)=>{

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

      const id = c.req.param('id');
      
      await prisma.user.delete({ where: { id: id } });
  
      return c.json("deleted user successfully");
  
      
  } catch (error) {
      
      return new Response("Unauthorized", { status: 403 });
  }
  })
