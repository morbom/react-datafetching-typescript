import { useEffect, useState } from "react";
import BlogPosts, { type BlogPost } from "./components/BlogPosts";
import { get } from "./util/http";
import fetchingImage from "./assets/data-fetching.png";

const URL = "https://jsonplaceholder.typicode.com/posts";

type RawDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [blogData, setBlogData] = useState<BlogPost[]>();

  async function fetchPosts() {
    const data = (await get(URL)) as RawDataBlogPost[];
    const blogPosts: BlogPost[] = data.map((rawPost) => {
      return {
        id: rawPost.id,
        text: rawPost.body,
        title: rawPost.title
      };
    });
    setBlogData(blogPosts);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main>
      <img src={fetchingImage} alt="data fetching" />
      {blogData && <BlogPosts posts={blogData} />}
    </main>
  );
}

export default App;
