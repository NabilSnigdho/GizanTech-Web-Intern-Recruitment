import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = {
	projectId: 'temp-12baf',
	privateKey:
		'-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCjIH4gVpw+3CMJ\nKDE53diH/axCxtFLAH6rwSjsk1prh3s9dqkcrugmGCiltkpKr8OObG0CVT2+UdBM\n/mKoyEvRd0xtt0HnSAdvzD06uayjbcYrXEj/2HWCbClOCL9yU8lj7TsVnN8OZNGc\nuScEBKTcJmw5bNHFGiqoqSN9ehYxPmru22wczjy1nT8PttqxYrlIitWY/HUqJS+0\nxTxo+rWSuwU6uwqVAAVinc1EiYAhRkeqC16dBG5cOTkpnEqDl5UWWIRTPR0RsqHV\nwbs8bsRfKNRNggDuR7P4T97xrcwezkqyPqyWiURgoAjklQhJdpYEoeN5E+LFnoJf\n0UJ0yrhHAgMBAAECggEAJp+B3WxEUEnU7c0bYqUZKJGyYJksYsK6OzZf1yvIY99P\nGa1nuwfapXJg5WN00ZwuBCG96ah/FvnOBPzSJT5PXUgOy4dxTi5qvFiyQp5Ftug9\n3HRcQF9i6z9qxDQkCBC4hTVdIO/kjEborl/UUgo7cniSdUJDpJRed1KcuY/Xg07v\nwRRnByivQMCiIh5lWGpE9tYMK58iUctj1CVNAlIg3t8/BTkswIzTsl/HlkrbrjpV\n9ixDRSKmcYE8PhSHoc+V9pAfyZUyis+mk3o1HajZsLBwzIHq/lqAO1NDfJt2IOLA\nWJMJrEV5uv4S1LSueDCLU5N8i7oKC8Dd62gGG6gbgQKBgQDibWwQA3E5boO/sJAX\njfvZMznHWWgwBIlUs7OaYkHrubWtSpn3k4QOePPtkCMtWHgps0hos+pO0UtEj3NG\nq/uXMzUjKQA17oufdfoc0oCcGG34be+9AV1eEw8dyTy3itMWui2iHS/5nx1TdZJ/\ngp6hWi7d7ptYZFf25BEWpNa4QQKBgQC4bp/pZT4WtIhupZKin7AalWQDBMZxDKK1\nWMlrIIXBw4FpFpU4huC2w9vUnefRH/sBTGYvUTCAYjN/tVpMpHY7Qer//xRMlWXo\n7ptYRC7weJW2uHnGI9REm8M1JCtp3f5ROyya5Ii5TS+pGMQm/rjhpD/G2EhN1esJ\nIL+aCnwOhwKBgDrPbOfj3P6rw7CALYzQpf9OHM24XSVLqFfFrPqGVtThEV0HKWJy\ngDQ6GjEz5M8cUWmTVVVMlakPF1uhXrGWbexhsoWFWranVMCAJgxiaGEivz1tYH1Y\n42VR0fVMlWaeuiEHDl8y8YkGWNmaighwZr9F6zJdjR+yQF6x8fZNri+BAoGAdTLn\nL3uEnw0N/bH9opXzZJE2QqzQJZqv8ql/JTI/jUfdfpg5LviW581CbrQBUeUOrl6M\nONlRBuRgcXEe9sEz2Kgk25SOo7P0VLb7xHVflrQp/zjvOTgfdZG91JEtfVLyf1Ap\nIizDrW0dMklorJcFiW3EkWlzWPLtLpm+5/ZtqxUCgYBYagxPFKeTgVmLzbdISeLe\ndmRpw0XYC+GkvpFPAanr30Q+aui8JdVv1DbED7o5JYhn++kBo7cPOVTByXcL57R/\nK0JSni17G8QOmNQ2TY2C9mlXgLLwZxxDJly2936Zge68qpOk7J9KvZqG8IqGS/En\nQ2mK7Q/Wjypu7Aeu0hdfQA==\n-----END PRIVATE KEY-----\n',
	clientEmail: 'firebase-adminsdk-ucguh@temp-12baf.iam.gserviceaccount.com'
};

export const adminApp = !getApps().length
	? initializeApp({
			credential: cert(serviceAccount)
	  })
	: getApp();
export const adminFirestore = getFirestore(adminApp);
export const adminAuth = getAuth(adminApp);

export async function decodeToken(token: string) {
	if (!token) {
		return null;
	}
	try {
		return await adminAuth.verifyIdToken(token);
	} catch (err) {
		console.error('An error occurred validating token', (err as Error).message);
		return null;
	}
}
