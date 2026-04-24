# Website Development ReadMe
- Website will have three tabs in the header, labelled (still work in progress) photos, audio clips, and maps
- Under photos, we will have some sort of portfolio display of the images from our project.
- Under Audio Clips, we need either a pop-up or nice looking page for listening to short audio snip-its
- Under maps, we need to be able to display maps, and possibly be able to zoom in, mark, etc. (Just a thought)

- When the website loads, it will default to the photos page, since that's probably what most people want. It will automatically collect a large JSON file with image metadata to create all the image html elements. Then, it'll gather photos as they show up, using (```<img src="photo.jpg" loading="lazy" alt="..." />```)
- Website files and images all stored in one place.
- Using AWS for pretty much all hosting.

## AWS Services (7 in Total... for now)
* **S3 (Simple Storage Service)** is being used to store website files as well as images. It provides easy storage and access.
* **Cloudfront** is used to store certain files at the cloud edge so people can accesss it quickly, and don't have to wait on S3, DynamoDB, etc. It will route traffic and serve the website files, handle TLS connections, etc.
* **DynamoDB** is used to store image metadata for quick retrieval and edits to tags if we need that.
* **API Gateway/Lambda** are being used for HTTPS requests from the javascript whenever we need the metadata or certain images. The frontend makes an HTTPS request for whatever it needs and API Gateway and Lambda will deal with that request.
* **Route 53 & ACM (AWS Certificate Manager)** are used for DNS, domain registration, and certificates of authenticity for the website. 

## Workload Breakup
- **Blake** - AWS Services and Integration.
- **Austin** - HTML, Javascript, and some styling if need be.
- **Ayden** - Basic HTML and styling with CSS.