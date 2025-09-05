import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../../Assets/assets';
import { motion } from 'framer-motion';
import moment from 'moment';
import { div } from 'framer-motion/client';
import Loader from '../../components/Loader';

const BlogPage = () => {

    const { id } = useParams();

    const [data, setData] = useState(null);
    const [comments , setComments ] = useState(null)


    const addComment = (e) =>{
        e.preventDefault()
    }


    const fetchBlogData = async () => {

        const data = blog_data.find(item => item._id === id)
        setData(data)
    }

    const fetchComments = async () =>{
        setComments(comments_data)
    }

    useEffect(() => {

        fetchBlogData()
        fetchComments()
    }, [])


    return data ? (
        <div>
            <div className="relative flex flex-col items-center justify-center px-4 py-10 text-center bg-gradient-to-b from-white via-purple-50 to-white rounded-b-3xl">

                {/* Published Date */}
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-sm text-indigo-600 font-medium"
                >
                    Published on {moment(data.createdAt).format('MMMM Do YYYY')}
                </motion.p>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mt-3 max-w-3xl text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight"
                >
                    {data.title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl"
                >
                    {data.subTitle}
                </motion.p>

                {/* Author Button */}
                <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="inline-block rounded-full py-1 px-4 mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary mt-6"
                >
                    Rifat Ahmed
                </motion.p>
            </div>


            <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>

                <img
                className='rounded-3xl mb-6'
                src={data.image} alt="" />

                <div className='rich-text max-w-3xl' dangerouslySetInnerHTML={{__html:data.description}}></div>


                <div className='mt-14 mb-10 max-w-5xl mx-auto'>

                    <p>Comments : ({comments.length})</p>

                    <div className='flex flex-col gap-4 mt-2 '>

                        {
                            comments.map((item,index) =>(
                                
                                <div key={index} className='bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'>

                                    <div className='flex items-center gap-2 mb-2 mt-2'>
                                        <img src={assets.user_icon} alt=""  className='w-6'/>
                                        <p className='font-medium'>{item.name}</p>
                                    </div>

                                    <p className='text-sm max-w-md ml-8'>{item.content}</p>

                                    {/* <div
                                    className='absolute right-4 bottom-3 flex item-center gap-2 text-xs'
                                    >{moment(item.createdAt).fromNow()}</div> */}

                                </div>
                            ))
                        }

                    </div>


                    <div className='max-w-5xl mx-auto mt-6'>

                        <p className='font-semibold mb-4'>Add your comment</p>

                        <form onSubmit={addComment}  className='flex flex-col items-start gap-4 max-w-lg ' required>

                            <input type="text" placeholder='Name ' className='w-full p-2 border  border-gray-300 rounded outline-none' />

                            <textarea placeholder='Comment' className='w-full p-2 border  border-gray-300 rounded outline-none h-48 r ' required></textarea>


                            <button type='submit' className='bg-primary text-white rounded py-2 px-8  hover:scale-105 transition-all cursor-pointer'>Submit</button>
                        </form>

                    </div>


                    <div className='my-24 mx-w-5xl mx-auto'>

                        <p className='font-semibold my-4'>Share the article on social media </p>

                        <div className='flex'>

                            <img src={assets.facebook_icon} alt="" width={50} />
                            <img src={assets.twitter_icon} alt="" width={50} />
                            <img src={assets.googleplus_icon} alt="" width={50} />
                        </div>

                    </div>

                </div>

            </div>

        </div>


    ) : <div>
        <Loader/>
    </div>
}

export default BlogPage