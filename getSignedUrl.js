const {S3Client,GetObjectCommand} =require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")


/**
 * This is Pre-Signed URL(Private Bucket mein use aate h)  :- There are Two Parts of that
 * 1.GetObject:- means Read object,
 * 2.PUT Object:- means Upload Object
 * 
 * eg.:-  https://legion-pvt.s3.ap-south-1.amazonaws.com   >>> This part is URL
 * eg:-  dbz.jpeg >>>> This part is key
 * 
 * X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA44Y6CXAPV5RZ5C6M%2F20240921%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240921T184427Z&X-Amz-Expires=900&X-Amz-Signature=4c3cf9cdbd1c072d0b98cd02521ec2557a75cefdc212792ba4bb7d70eebcbd7e&X-Amz-SignedHeaders=host&x-id=GetObject
 * >>> This is Token and Access Key
 */


//  https://legion-pvt.s3.ap-south-1.amazonaws.com/dbz.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA44Y6CXAPV5RZ5C6M%2F20240921%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240921T184427Z&X-Amz-Expires=900&X-Amz-Signature=4c3cf9cdbd1c072d0b98cd02521ec2557a75cefdc212792ba4bb7d70eebcbd7e&X-Amz-SignedHeaders=host&x-id=GetObject


//  This is When if Our Bucket is Private and not access Public
const s3Client=new S3Client({
    region:'ap-south-1',
    credentials:{
        accessKeyId:process.env.ACCESS_KEY_ID,
        secretAccessKey:process.env.SECRET_ACCESS_KEY
    }
})


async function getObjectURL(key) {
    const command=new GetObjectCommand({
        Bucket:'legion-pvt',
        Key:key
    })

    // const URL=await getSignedUrl(s3Client,command)
    const URL=await getSignedUrl(s3Client,command,{expiresIn:20})
    return URL;
}

async function init(){
    const url=await getObjectURL('dbz.jpeg')
    console.log("URl:--  ",url)
}

init();