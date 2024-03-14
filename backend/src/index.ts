
import { Hono } from 'hono'
import {cors} from 'hono/cors';
import { userRouter } from './routes/user';

import { blogRouter } from './routes/blog';
import { adminRouter } from './routes/admin';




const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
	Variables : {
		userId: string
	}
}>();

app.use('/api/*', cors())
app.route('api/v1/user', userRouter);
app.route('api/v1/blog', blogRouter);
app.route('api/v1/admin', adminRouter);

export default app








