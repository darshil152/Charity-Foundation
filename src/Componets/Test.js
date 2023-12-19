import React, { useState } from 'react'

export default function () {

    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked);
    };

    const handleDoubleClick = () => {
        setLiked(false);
    };

    return (
        <div>
            {liked ? (
                <button onDoubleClick={handleDoubleClick}><img width="64" height="64" src="https://img.icons8.com/wired/64/thumbs-down.png" alt="thumbs-down" /></button>
            ) : (
                <button onDoubleClick={handleClick}><img width="50" height="50" src="https://img.icons8.com/ios/50/facebook-like--v1.png" alt="facebook-like--v1" /></button>
            )}
        </div>
    )
}
