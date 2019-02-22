import React from 'react'
// import PropTypes from 'prop-types'
// import ImageUploader from 'react-images-upload'

const ProfilePhoto = ( {src, name} ) => {
	
	const onDrop = (pictureFiles, pictureDataURLs) => {
		
	}

	return( 
		<div className='profile-photo'>
		<h1>{name}</h1>
		<img src={src}
			className='profile-photo'
			width={300}
			height={300}
		/>
		<div className = 'image-uploader'>
		{/*<ImageUploader
                withIcon={false}
                buttonText='Choose image'
                onChange={onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                singleImage={true}
                withLabel={false}
        />*/}
		</div>
		</div>
	)
}


export default ProfilePhoto