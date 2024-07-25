'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminPanel = () => {
  const [emails, setEmails] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [stats, setStats] = useState({ totalEmails: 0, totalBlogs: 0 });

  const fetchEmails = async () => {
    try {
      const response = await axios.get('/api/email');
      if (response.data.success) {
        setEmails(response.data.emails);
        setStats(prevStats => ({ ...prevStats, totalEmails: response.data.emails.length }));
      } else {
        toast.error("Error fetching emails.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching emails.");
      console.error("Error fetching emails:", error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      if (response.data.blogs) {
        setBlogs(response.data.blogs);
        setStats(prevStats => ({ ...prevStats, totalBlogs: response.data.blogs.length }));
      } else {
        toast.error("Error fetching blogs.");
        console.error("Error fetching blogs: Server response unsuccessful");
      }
    } catch (error) {
      toast.error("An error occurred while fetching blogs.");
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchEmails();
    fetchBlogs();
  }, []);

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-5">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Total Emails</h3>
              <p className="text-2xl">{stats.totalEmails}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Total Blogs</h3>
              <p className="text-2xl">{stats.totalBlogs}</p>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
          <ul className="list-disc list-inside bg-white p-4 rounded-lg shadow-md">
            {blogs.slice(0, 5).map((blog, index) => (
              <li key={index} className="mb-2">
                New blog post: <strong>{blog.title}</strong> by {blog.author}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Subscribed Emails</h2>
          <div className="relative overflow-x-auto bg-white p-4 rounded-lg shadow-md">
            <table className="w-full text-sm text-gray-500">
              <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {emails.map((email, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4">{email.email}</td>
                    <td className="px-6 py-4">{new Date(email.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPanel;
