import { Loader2, Plus, Send } from "lucide-react";
import React, {
  useState,
} from "react";
import SelectedImages from "./selectedImages";

const InputForm = ({
  handleInputChange,
  handleSubmit,
  input,
  isLoading,
  stop
}) => {
  const [images, setImages] = useState([]);
  const handleImageSelection = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return; // Ensure that files exist
  
    const imagePromises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const base64String = e.target?.result?.toString();
          resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });
  
    try {
      const base64Strings = await Promise.all(imagePromises);
      setImages((prevImages) => [
        ...prevImages,
        ...base64Strings, // Add new base64 images to the previous state
      ]);
    } catch (error) {
      console.error("Error reading image:", error);
    }
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(event, {
          data: {
            images: JSON.stringify(images),
          },
        });
      }}
      className="w-full flex flex-row gap-2 items-center   bg-gray-950  p-2"
    >
      {/* <div className="border flex flex-row relative">
        <Plus
          onClick={() => document.getElementById("fileInput")?.click()} // Click event handler
          className="cursor-pointer p-3 h-10 w-10 stroke-stone-500"
        />
        <SelectedImages images={images} setImages={setImages} />
      </div>
      <input
        className="hidden"
        id="fileInput"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageSelection}
      /> */}
      <input
        type="text"
        placeholder={isLoading ? "Generating . . ." : "ask something . . . "}
        value={input}
        disabled={isLoading}
        onChange={handleInputChange}
        className="border border-dashed text-white bg-gray-950 rounded-md  outline-none w-full py-2 px-4 text-right focus:placeholder-transparent disabled:bg-transparent"
      />
      <button
        type="submit"
        className="rounded-full shadow-md border flex flex-row"
      >
        {isLoading ? (
          <Loader2
            onClick={stop}
            className="p-3 h-10 w-10 stroke-stone-500 animate-spin"
          />
        ) : (
          <Send className="p-3 h-10 w-10 stroke-stone-500" />
        )}
      </button>
    </form>
  );
};

export default InputForm;
