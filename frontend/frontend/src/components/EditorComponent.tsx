import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { TINY_MCE } from "../config";


export function MyEditor({ htmlContent, edittitle, id }: { edittitle: string, htmlContent: string, id: string }) {
  const navigate = useNavigate();
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>(edittitle);

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSave = () => {

    if(content===""){
      alert("Content is required!");
      return;
    }

    const url = `${BACKEND_URL}/api/v1/blog`;
    const token = localStorage.getItem("token");

    if (id === "") {
      axios.post(url, {
        title,
        content
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        const newId = res.data.id;
        navigate(`/blog/${newId}`);
      }).catch((error) => {
        console.error('Error creating new post:', error);
      });
    } else {
      axios.put(`${url}`, {
        id,
        title,
        content
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(() => {
        navigate(`/blog/${id}`);
      }).catch((error) => {
        console.error('Error updating post:', error);
      });
    }
  };

  const handleDelete = () => {
    const url = `${BACKEND_URL}/api/v1/blog/${id}`;
    const token = localStorage.getItem("token");

    const confirmed =window.confirm("Are you sure you want to Delete this blog?");
    if(confirmed){

    axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(() => {
      navigate(`/blogs`);
    }).catch((error) => {
      console.error('Error deleting post:', error);
    });}
  };

  return (
    <div className="flex flex-col justify-center items-center px-7">
      <div className="p-5 w-full">
        <input className="focus:outline-none font-bold md:text-3xl sm:text-2xl w-full"
          type="text"
          required
          placeholder="Enter your title here"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="w-full">
        <Editor
          apiKey={TINY_MCE}
          init={{
            placeholder: "Enter your content here",
            plugins: 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste help wordcount',
            toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code',
            menubar: false,
          }}
          initialValue={htmlContent}
          onEditorChange={handleEditorChange}
        />
      </div>

      <div className="flex justify-between w-full mt-3">
        <button className="border text-xl text-white font-semibold px-2 py-1 bg-blue-600 rounded-md" onClick={handleSave}>Save</button>
        {id && <button className="border text-xl text-white font-semibold px-2 py-1 bg-red-600 rounded-md" onClick={handleDelete}>Delete</button>}
      </div>
    </div>
  );
}

export default MyEditor;
