import React from "react";
import { Link } from "react-router-dom";
import "./BlogPage.css"; // Optional: create this for custom styles

const blogPosts = [
  {
    id: "resume-builder-for-freshers",
    title: "Resume Builder for Freshers: Tips & Templates",
    excerpt:
      "Kickstart your career with our expert tips and free resume templates tailored for freshers. Learn how to make your first impression count.",
    date: "2024-07-01",
    author: "Team Digital Resume Builder",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    path: "/blog/resume-builder-for-freshers",
  },
  // Add more blog posts here as your content grows
];

const categories = [
  "Resume Tips",
  "Career Advice",
  "Templates",
  "Interview Prep",
];

const recentPosts = [
  {
    title: "Resume Builder for Freshers: Tips & Templates",
    path: "/blog/resume-builder-for-freshers",
  },
  // Add more recent posts as needed
];

const BlogPage = () => {
  console.log("BlogPage rendered");
  return (
    <div className="blog-container" style={{ display: "flex", gap: "2rem", padding: "2rem", maxWidth: 1200, margin: "0 auto" }}>
      <main style={{ flex: 3 }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Digital Resume Builder Blog</h1>
        <p style={{ color: "#555", marginBottom: "2rem" }}>
          Insights, tips, and resources to help you build the perfect resume and land your dream job.
        </p>
        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <section style={{ marginBottom: "2rem", borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px #eee" }}>
            <img src={blogPosts[0].image} alt={blogPosts[0].title} style={{ width: "100%", maxHeight: 250, objectFit: "cover" }} />
            <div style={{ padding: "1.5rem" }}>
              <h2>
                <Link to={blogPosts[0].path} style={{ textDecoration: "none", color: "#1a73e8" }}>
                  {blogPosts[0].title}
                </Link>
              </h2>
              <p style={{ color: "#888", fontSize: "0.9rem" }}>
                {blogPosts[0].author} &middot; {new Date(blogPosts[0].date).toLocaleDateString()}
              </p>
              <p>{blogPosts[0].excerpt}</p>
              <Link to={blogPosts[0].path} style={{ color: "#1a73e8", fontWeight: 500 }}>
                Read More &rarr;
              </Link>
            </div>
          </section>
        )}
        {/* Blog List */}
        <section>
          <h3 style={{ marginBottom: "1rem" }}>All Articles</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {blogPosts.map((post) => (
              <li key={post.id} style={{ marginBottom: "2rem", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>
                <h4>
                  <Link to={post.path} style={{ textDecoration: "none", color: "#222" }}>
                    {post.title}
                  </Link>
                </h4>
                <p style={{ color: "#888", fontSize: "0.9rem" }}>
                  {post.author} &middot; {new Date(post.date).toLocaleDateString()}
                </p>
                <p>{post.excerpt}</p>
                <Link to={post.path} style={{ color: "#1a73e8" }}>
                  Read More
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      {/* Sidebar */}
      <aside style={{ flex: 1, minWidth: 250 }}>
        <div style={{ marginBottom: "2rem" }}>
          <h4 style={{ borderBottom: "2px solid #1a73e8", paddingBottom: "0.5rem" }}>Categories</h4>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
            {categories.map((cat) => (
              <li key={cat} style={{ marginBottom: "0.5rem" }}>
                <span style={{ color: "#1a73e8" }}>{cat}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ borderBottom: "2px solid #1a73e8", paddingBottom: "0.5rem" }}>Recent Posts</h4>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
            {recentPosts.map((post) => (
              <li key={post.title} style={{ marginBottom: "0.5rem" }}>
                <Link to={post.path} style={{ color: "#222", textDecoration: "none" }}>
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default BlogPage;
