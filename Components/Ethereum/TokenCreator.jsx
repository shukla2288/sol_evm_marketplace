import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { useDropzone } from "react-dropzone";

///INTERNAL IMPORT
import UploadICON from "./SVG/UploadICON";
import Input from "./Input";

const TokenCreator = ({
  setOpenTokenCreatorModel,
  setLoader,
  PINATA_AIP_KEY,
  PINATA_SECRECT_KEY,
  address,
  createERC20,
}) => {
  const [imageURL, setImageURL] = useState();

  const [token, updateToken] = useState({
    name: "",
    symbol: "",
    supply: "",
  });
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const uploadToIPFS = async (file) => {
    if (file) {
      try {
        setLoader(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          maxBodyLength: "Infinity",
          headers: {
            pinata_api_key: PINATA_AIP_KEY,
            pinata_secret_api_key: PINATA_SECRECT_KEY,
            "Content-Type": "multipart/form-data",
          },
        });

        const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

        setImageURL(url);
        setLoader(false);
        notifySuccess("Cover Image Uploade Successfully");
      } catch (error) {
        setLoader(false);
        notifyError("Unable to upload image to Pinata");
      }
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToIPFS(acceptedFile[0]);
  }, []);

  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({ onDrop, maxSize: 500000000000 });

  return (
    <div className="bootstrap">
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-custom modal-custom-xl">
          <div className="modal-content">
            <button
              onClick={() => setOpenTokenCreatorModel(false)}
              className="close"
            />
            <div className="modal-header">
              <div className="modal-title">Token Creator</div>
              <div className="modal-desc">
                Create your ERC20 token and launch
              </div>
            </div>
            <div className="modal-body">
              <>
                {imageURL ? (
                  <div>
                    <img
                      style={{ width: "150px", height: "auto" }}
                      src={imageURL}
                      alt=""
                    />
                  </div>
                ) : (
                  <div {...getRootProps()}>
                    <label for="file" class="custum-file-upload">
                      <div class="icon">
                        <UploadICON />
                      </div>
                      <div class="text">
                        <span>Click to upload Logo</span>
                      </div>
                      <input {...getInputProps()} id="file" type="file" />
                    </label>
                  </div>
                )}
              </>
              <div>
                <Input
                  placeholder={"Name"}
                  handleChange={(e) =>
                    updateToken({ ...token, name: e.target.value })
                  }
                />
                <Input
                  placeholder={"Symbol"}
                  handleChange={(e) =>
                    updateToken({ ...token, symbol: e.target.value })
                  }
                />
                <Input
                  placeholder={"Supply"}
                  handleChange={(e) =>
                    updateToken({ ...token, supply: e.target.value })
                  }
                />

                <div className="form-group">
                  <button
                    onClick={() => createERC20(token, address, imageURL)}
                    className="btn btn-primary btn-block "
                  >
                    Create token
                  </button>
                </div>
              </div>
              <div className="text-center notice">
                By using our tool you agree to our
                <a href="/pricing" target="_blank">
                  Privacy &amp; Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenCreator;
