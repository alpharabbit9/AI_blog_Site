import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../Assets/assets'
import Quill from 'quill'
import toast from 'react-hot-toast'
import axios from 'axios'
import { parse } from 'marked'
import { useNavigate } from 'react-router-dom'

const AddBlogs = () => {
    const editorRef = useRef(null)
    const quillRef = useRef(null)
    const navigate = useNavigate()

    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")
    const [category, setCategory] = useState("Startup")
    const [isPublished, setIsPublished] = useState(false)

    // separate loading states
    const [imageLoading, setImageLoading] = useState(false)
    const [aiLoading, setAiLoading] = useState(false)

    // === HANDLE IMAGE UPLOAD TO IMGBB ===
    const handleImageUpload = async (file) => {
        if (!file) return
        setImageLoading(true)

        const formData = new FormData()
        formData.append("image", file)

        const apiKey = "d124993969e06253e686485e0548aaa8"

        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: formData,
            })

            const data = await res.json()
            if (data.success) {
                setImageUrl(data.data.url)
                console.log("Uploaded image:", data.data.url)
            } else {
                console.error("ImgBB upload failed:", data)
            }
        } catch (error) {
            console.error("Error uploading image:", error)
        } finally {
            setImageLoading(false)
        }
    }

    // === AI GENERATION ===
    const generateWithAI = async () => {
        if (!title) return toast.error("Please Enter a title");

        try {
            setAiLoading(true);
            const { data } = await axios.post("http://localhost:3000/api", { title });

            if (data.success) {
                // Show in Quill editor
                quillRef.current.root.innerHTML = parse(data.content);

                // Log in console
                console.log("AI Generated:", data.content);

                // Optional toast
                toast.success("AI content generated!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("AI Error:", error);
            toast.error(error.message);
        } finally {
            setAiLoading(false);
        }
    };

    // === FORM SUBMIT ===
    // === FORM SUBMIT ===
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const blogDescription = quillRef.current.root.innerHTML

        const blogData = {
            title,
            subTitle,
            category,
            description: blogDescription,
            image: imageUrl,
            published: isPublished,
        }

        console.log("Blog Submitted:", blogData)

        try {
            const res = await axios.post("http://localhost:3000/blogs", blogData)
            console.log(res.data)

            if (res.data.insertedId) {
                toast.success("Blog Uploaded")
                navigate('/dashboard')
            } else {
                toast.error("Failed to upload blog")
            }
        } catch (error) {
            console.error("Blog upload error:", error)
            toast.error("Something went wrong while uploading")
        }
    }


    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
        }
    }, [])

    return (
        <div>
            <form onSubmit={onSubmitHandler} className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll">
                <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">

                    {/* Image Uploader  */}
                    <p>Upload Thumbnail</p>
                    <label htmlFor="image">
                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload_area}
                            alt=""
                            className="mt-2 h-16 rounded cursor-pointer"
                        />
                        <input
                            onChange={(e) => {
                                const file = e.target.files[0]
                                setImage(file)
                                handleImageUpload(file)
                            }}
                            type="file"
                            id="image"
                            hidden
                            required
                        />
                    </label>
                    {imageLoading && <p className="text-sm text-blue-500 mt-2">Uploading image...</p>}
                    {imageUrl && <p className="text-sm text-green-600 mt-2">Uploaded ✅</p>}

                    {/* Title */}
                    <p className="mt-4">Blog Title</p>
                    <input
                        type="text"
                        placeholder="Type here"
                        required
                        className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />

                    {/* Subtitle */}
                    <p className="mt-4">Blog Subtitle</p>
                    <input
                        type="text"
                        placeholder="Type here"
                        required
                        className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
                        onChange={(e) => setSubTitle(e.target.value)}
                        value={subTitle}
                    />

                    {/* Description */}
                    <p className="mt-4">Blog Description</p>
                    <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
                        <div ref={editorRef}></div>
                        <button
                            disabled={aiLoading}
                            type="button"
                            onClick={generateWithAI}
                            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
                        >
                            {aiLoading ? "Generating..." : "Generate with AI"}
                        </button>
                    </div>

                    {/* Category */}
                    <p className="mt-4">Blog Category</p>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        name="category"
                        className="mt-2 py-2 px-3 border text-gray-500 border-gray-300 outline-none rounded"
                    >
                        <option value="">Select Category</option>
                        {blogCategories.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>

                    {/* Publish */}
                    <div className="flex gap-3 mt-4">
                        <p>Publish Now</p>
                        <input
                            onChange={(e) => setIsPublished(e.target.checked)}
                            type="checkbox"
                            checked={isPublished}
                            className="scale-125 cursor-pointer"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
                    >
                        Add Blog
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddBlogs
