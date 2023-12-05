import React, { useState, useEffect } from "react";
import { getArticleImage } from "../../../../api/api";
const ArticleImage = ({ image }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await getArticleImage(image.filename);
        // Create a blob URL from the image data
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const url = URL.createObjectURL(blob);

        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [image]);

  return <img src={imageUrl} alt="Image" />;
};

export default ArticleImage;
