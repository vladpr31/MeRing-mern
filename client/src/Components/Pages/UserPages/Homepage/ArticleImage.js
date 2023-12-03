import React, { useState, useEffect } from "react";
import { getArticleImage } from "../../../../api/api";
const ArticleImage = ({ image }) => {
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await getArticleImage(image.filename);
        console.log(response);
        // Create a blob URL from the image data
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const url = URL.createObjectURL(blob);

        // Set the image URL in the state
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  return <div>{imageUrl && <img src={imageUrl} alt="Image" />}</div>;
};

export default ArticleImage;
