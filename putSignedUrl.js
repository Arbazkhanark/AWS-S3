const {S3Client, PutObjectCommand, GetObjectCommand}=require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client=new S3Client({
    region:'ap-south-1',
    credentials:{
        accessKeyId:process.env.ACCESS_KEY_ID,
        secretAccessKey:process.env.SECRET_ACCESS_KEY
    }
})

async function putObjectURL(fileName,contentType){
    const command=new PutObjectCommand({
        Bucket:'legion-pvt',
        Key:`uploads/user-upload/${fileName}`,
        ContentType:contentType
    })

    const url=await getSignedUrl(s3Client,command);
    return url;
}

async function init() {
    // const putObjURL=await putObjectURL(`image-${Date.now()}.jpeg`,'image/jpeg');
    // console.log(putObjURL);
    const getObjURL=await getObjectURL('uploads/user-upload/image-1726948066653.jpeg')
    console.log(getObjURL);
}
init();







///  Now if you want to Get that Image which you have upload above you need to make getSignedURL to read the object

async function getObjectURL(key) {
    const command=new GetObjectCommand({
        Bucket:'legion-pvt',
        Key:key
    })

    const url=await getSignedUrl(s3Client,command);
    return url;
}