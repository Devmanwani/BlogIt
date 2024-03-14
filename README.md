# Blog It

Welcome to Blog It, a full-stack blogging website built with React and Cloudflare Workers.

## Overview

Blog It is a fully functional blogging platform where users can create, customize, and share their own blogs. It features a user-friendly interface with various functionalities including:

- Customized blogs: Users can create blogs with images, embeds, and customized content.
- Blog management: Users can view, edit, and delete their blogs.
- Search functionality: Users can search for blogs using a search bar.
- Admin panel: Administrators have access to an admin panel to manage blogs and users.

## Live Demo

The project is live at [blog-it-dev.vercel.app](https://blog-it-dev.vercel.app/).

## Video Demo

To learn more about the project and its features, check out the [YouTube video demo](https://www.youtube.com/watch?v=ovfHd57qWo4).

## Technologies Used

- Frontend: React
- Backend: Cloudflare Workers (Wrangler)
- Database: (PostgreSQL)
- ORM: Prisma

use this and create a blog about it and add a learnings section as well and add used external Library for the editing of the content

SearchBar:
prisma does not support like queries (sql) so had to use raw queries,
And used custom hook to get the data ,
optimized it by using debouncing.


Appbar: used contextApi for getting User details
Since appBar is being used in every page


Implimented Pagination:
used States to manage currentPage and blogs Per page


used Skeleton while data was being fetched

when deploying to vercel it gives 404 for routing, you just need to add a vercel.json file
with for that.
