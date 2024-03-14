import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { CreateBlogInput, UpdateBlogInput, UpdateBlogSchema } from "@devmanwani/blog";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
	Variables : {
		userId: string
       
	}
}>();

blogRouter.use("/*", async (c, next) => {
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1];
  
    try {
        const response = await verify(token, c.env.JWT_SECRET);
        if (!response.id) {
            throw new Error("Unauthorized");
        }
  
        c.set('userId', response.id);
        
        
        await next();
    } catch (error) {
        console.error("Error in middleware:", error);
        return new Response("Unauthorized", { status: 403 });
    }
});

blogRouter.delete('/:id', async (c) => {
    const userId = c.get('userId');
    const blogId = c.req.param('id');

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        // Fetch blog details including author's ID
        const blogDetails = await prisma.post.findUnique({
            where: { id: blogId },
            select: { authorId: true }
        });

        if (!blogDetails) {
            return new Response('Blog not found', { status: 404 });
        }

        const authorId = blogDetails.authorId;

        if (authorId !== userId) {
            // If authorId is not equal to userId, check if userId exists in the Admin table
            const userInAdmin = await prisma.admin.findUnique({
                where: { id: userId }
            });

            if (!userInAdmin) {
                return new Response('Unauthorized', { status: 403 });
            }
        }

        // At this point, either userId matches authorId or userId is found in the Admin table
        await prisma.post.delete({ where: { id: blogId } });
        return new Response('Blog deleted successfully', { status: 200 });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
});





blogRouter.post('/', async (c)=>{
    
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const {success} = CreateBlogInput.safeParse(body);

    if(!success){
        return c.json({error:
            "Incorrect Inputs"
        });
    }

    const post = await prisma.post.create({
        data:{
            title: body.title,
            content:body.content,
            authorId:userId
        }
    });

    return c.json({
        id: post.id
    })

  })


blogRouter.put('/', async (c)=>{
    
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = UpdateBlogInput.safeParse(body);

    if(!success){
        c.json({error:
            "Incorrect Inputs"
        });
    }

    await prisma.post.update({
        where:{
            id: body.id,
            authorId:userId
        },
        data:{
            title:body.title,
            content: body.content
        }
    });

    return c.text('updated post');

  })

blogRouter.get('/bulk', async (c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            createdAt:true,
            author:{
                select:{
                    firstName:true,
                    lastName:true,
                    color:true
                }
            }
        }
    });

    return c.json(posts);

})

blogRouter.get('/myBlogs', async (c) => {
    try {
       const userId = c.get('userId'); 
       if (!userId) {
            return c.json({ error: 'User not found' }, { status: 404 });
        }

        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const posts = await prisma.post.findMany({
            where:{
                author:{
                    id:userId}
            },
            select:{
                title:true,
                content:true,
                id:true,
                createdAt:true,
                author:{
                    select:{
                    firstName:true,
                    lastName:true,
                    color:true
                }
                }
            }
        });

        return c.json(posts);

    } catch (error) {
        console.error('Error retrieving user blogs:', error);
        return c.json({ error: 'Internal Server Error' }, { status: 500 });
    }
});

blogRouter.get('/search', async (c) => {
    try {
        const searchText = c.req.query('title');

        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        
        const posts = await prisma.$queryRaw`
        SELECT 
            "Post".*,
            "User"."firstName",
            "User"."lastName",
            "User"."color"
        FROM 
            "Post"
        INNER JOIN 
            "User" 
        ON 
            "Post"."authorId" = "User"."id"
        WHERE 
            "title" ILIKE '%' || ${searchText} || '%';
    `;
    
    

        return c.json(posts);
    } catch (error) {
        console.error('Error searching blogs by title:', error);
        return c.json({ error: 'Internal Server Error' }, { status: 500 });
    }
});



blogRouter.get('/:id', async (c)=>{
    
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.findUnique({
        where:{
            id
        },
        select:{
            title:true,
            content:true,
            id:true,
            createdAt:true,
            author:{
                select:{
                firstName:true,
                lastName:true,
                color:true,
                id:true
            }
            }
        }
    });

    return c.json(post);

  });

  






