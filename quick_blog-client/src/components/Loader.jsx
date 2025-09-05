import React from 'react'

const Loader = () => {
    return (
        <div className='flex justify-center items-center p-20'>

            <div>
                <span className="loading loading-ball loading-xs"></span>
                <span className="loading loading-ball loading-sm"></span>
                <span className="loading loading-ball loading-md"></span>
                <span className="loading loading-ball loading-lg"></span>
                <span className="loading loading-ball loading-xl"></span>
            </div>
        </div>
    )
}

export default Loader