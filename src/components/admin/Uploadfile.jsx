import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { removeFiles, UploadFiles } from "../../api/Product";
import useEcomStore from "../../store/ecom-store";
import { Loader } from "lucide-react";

const Uploadfile = ({ form, setForm }) => {
  const token = useEcomStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChage = (e) => {
    setIsLoading(true);
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = form.images;
      for (let i = 0; i < files.length; i++) {
        // Validate
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is not image`);
          continue;
        }
        // Image Resize
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            // endpoint backend
            UploadFiles(token, data)
              .then((res) => {
                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                setIsLoading(false);
                toast.success("Upload image success!!");
                // console.log(res);
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleDelete = (public_id) => {
    const images = form.images;
    removeFiles(token, public_id)
      .then((res) => {
        const filterImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setForm({
          ...form,
          images: filterImages,
        });
        toast.error(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="my-4">
      <div className="flex mx-4 gap-4 my-4">
        {isLoading && <Loader className="w-16 h-16 animate-spin" />}

        {form.images.map((item, index) => (
          <div className="relative" key={index}>
            <img src={item.url} className="w-24 h-24 hover:scale-105" />
            <span
              onClick={() => handleDelete(item.public_id)}
              className="absolute top-0 right-0 bg-red-500 p-1 rounded-md"
            >
              x
            </span>
          </div>
        ))}
      </div>
      <div>
        <input onChange={handleOnChage} type="file" name="images" multiple />
      </div>
    </div>
  );
};

export default Uploadfile;
