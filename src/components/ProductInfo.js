import Player from 'next-video/player';
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

// Utility function to convert YouTube URL to embed format
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  
  // If it's already an embed URL, return as is
  if (url.includes('/embed/')) {
    return url;
  }
  
  // Extract video ID from various YouTube URL formats
  let videoId = null;
  
  // Standard watch URL: https://www.youtube.com/watch?v=VIDEO_ID
  if (url.includes('watch?v=')) {
    videoId = url.split('watch?v=')[1].split('&')[0];
  }
  // Short URL: https://youtu.be/VIDEO_ID
  else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  }
  // Mobile URL: https://m.youtube.com/watch?v=VIDEO_ID
  else if (url.includes('m.youtube.com/watch?v=')) {
    videoId = url.split('watch?v=')[1].split('&')[0];
  }
  
  // Return embed URL if we found a video ID
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

export default function ProductInfo({ product, type, isOne }) {
  if (isOne) {
    return (
      <div className="product-info">
        <h2>{product.name}</h2>
        
        <h3 className="product-code">Product Description:</h3>

        <p className="text-lg leading-8 text-gray-800">
          {product.description.split("\n").map((item, key) => {
            return (
              <span key={key}>
                {item}
                <br />
              </span>
            );
          })}
        </p>

        {product.youtube_link && (
          <div className="mt-6">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={getYouTubeEmbedUrl(product.youtube_link)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        )}

      </div>
    );
  }
  return (
    <div className="product-info">
      <h3 className="product-code">{product.name}</h3>
      <div className="pt-6 flex items-center">
        <p className="text-gray-500">View {type}</p>
        <ArrowLongRightIcon className="ml-2 h-6 w-6 text-gray-500" />
      </div>
    </div>
  );
}
