import React from "react";
import styled from "styled-components";
import uploadIcon from "static/upload.png";
import IconButton from "./IconButton";

function PhotoUploader({
    photo,
    onChange,
    aspectRatio = 16 / 9,
    ...delegated
}){
    const handleChange = React.useCallback(
        e => {
            const file = e.target.files[0];
            onChange(file);
        },
        [onChange]
    );

    const getPhotoUrl = React.useCallback(
        value => {
            if(value instanceof File) return URL.createObjectURL(value);
            return value;
        },
        []
    );

    return (
        <div {...delegated}>
            <Wrapper aspectRatio={aspectRatio}>
                {
                    photo ?
                        <>
                            <Photo src={getPhotoUrl(photo)} />
                            <Remove
                                type="delete"
                                onClick={() => onChange(null)}
                            />
                        </>
                        :
                        <LabelWrapper>
                            <label htmlFor="photo" className="upload-label">
                                <img src={uploadIcon} />
                            </label>
                            <input 
                                type="file" 
                                id="photo" 
                                className="photo-input"
                                accept="images/*" 
                                onChange={handleChange}
                            />
                        </LabelWrapper>
                }
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
    border: 1px solid hsl(0deg, 0%, 80%);
    position: relative;
    padding-bottom: ${props => Math.pow(props.aspectRatio, -1) * 100}%;
`;

const LabelWrapper = styled.div`    
    .upload-label{
        cursor: pointer;
        ${props => props.theme.mixins.background};
        ${props => props.theme.mixins.flexCenter};
    }

    .photo-input{
        display: none;
    }
`;

const Photo = styled.img`
    ${props => props.theme.mixins.background};
    object-fit: cover;
`;

const Remove = styled(IconButton)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: rgb(0, 0, 0, 0.5);

    img{
        width: 30px;
    }
`;

export default PhotoUploader;