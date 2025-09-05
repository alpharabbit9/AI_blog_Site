import { motion } from 'framer-motion';

const Newsletter = () => {
    return (
        <motion.div
        className='text-center justify-evenly text-[#364153] py-12 px-12'>

            <div>
                <h3 className='text-3xl font-bold'>
                    Subscribe to our newsletter
                </h3>

               
            </div>

            <form className=' '>
               
                <fieldset className="w-80 mx-auto mt-4">
                    <label>Enter your email address</label>
                    <div className="join">
                        <input
                            type="text"
                            placeholder="username@site.com"
                            className="input input-bordered join-item" />
                        <button className="btn bg-primary text-white join-item">Subscribe</button>
                    </div>
                </fieldset>
            </form>

        </motion.div>
    );
};

export default Newsletter;