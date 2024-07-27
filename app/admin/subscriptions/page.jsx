'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EmailList = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    try {
      const response = await axios.get('/api/email');
      if (response.data.success) {
        setEmails(response.data.emails);
      } else {
        toast.error("Error fetching emails.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching emails.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-2xl font-semibold mb-4">All Subscribed Emails</h1>
      <div className="relative h-auto max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
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
    </div>
  );
};

export default EmailList;
