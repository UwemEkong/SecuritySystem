package edu.ben.backend;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.HttpMethod;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;

import java.io.IOException;
import java.net.URL;
import java.time.Instant;

public class GeneratePresignedURL {

    public static String genPresignedURL(String bucketName, String objectKey) throws IOException {
        Regions clientRegion = Regions.DEFAULT_REGION;
        //String bucketName = "*** Bucket name ***";
        //String objectKey = "*** Object key ***";

        try {
            // PROLLY NOT VERY SECURE BUT .... HERE IS HOW WE GIVE AWS THE CREDENTIALS
            // MORE SECURE WAY here for reference: https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html
            String accesskey = "AKIA2X357CBVPHQAVH2E";
            String secretkey = "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";
            BasicAWSCredentials credentials = new BasicAWSCredentials(accesskey, secretkey);

            AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                    .withRegion("us-east-1")
                    .withCredentials(new AWSStaticCredentialsProvider(credentials))
                    .build();

            // ^^ also prolly shouldn't be using us-east-1 hardcoded, but it works so .... whatchu gon do

            // Set the presigned URL to expire after one hour.
            java.util.Date expiration = new java.util.Date();
            long expTimeMillis = Instant.now().toEpochMilli();
            expTimeMillis += 1000 * 60 * 60;
            expiration.setTime(expTimeMillis);

            // Generate the presigned URL.
            System.out.println("Generating pre-signed URL.");
            GeneratePresignedUrlRequest generatePresignedUrlRequest =
                    new GeneratePresignedUrlRequest(bucketName, objectKey)
                            .withMethod(HttpMethod.GET)
                            .withExpiration(expiration);
            URL url = s3Client.generatePresignedUrl(generatePresignedUrlRequest);

            System.out.println("Pre-Signed URL: " + url.toString());
            return url.toString();
        } catch (AmazonServiceException e) {
            // The call was transmitted successfully, but Amazon S3 couldn't process
            // it, so it returned an error response.
            e.printStackTrace();
        } catch (SdkClientException e) {
            // Amazon S3 couldn't be contacted for a response, or the client
            // couldn't parse the response from Amazon S3.
            e.printStackTrace();
        }
        return "failed_to_generate_url";
    }

    public static void deleteFromS3(String bucketName, String objectKey) {

        String accesskey = "AKIA2X357CBVPHQAVH2E";
        String secretkey = "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";

        BasicAWSCredentials credentials = new BasicAWSCredentials(accesskey, secretkey);
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withRegion("us-east-1")
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .build();

        s3Client.deleteObject(bucketName, objectKey);
    }

    }

