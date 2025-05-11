import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';

// Initialize face detection model
let model: blazeface.BlazeFaceModel | null = null;

export const loadFaceDetectionModel = async (): Promise<void> => {
  if (!model) {
    // Ensure TensorFlow is ready
    await tf.ready();
    // Load the BlazeFace model
    model = await blazeface.load();
  }
};

export const detectFaces = async (
  imageElement: HTMLImageElement | HTMLVideoElement
): Promise<blazeface.NormalizedFace[]> => {
  if (!model) {
    await loadFaceDetectionModel();
  }
  
  // Run face detection
  const predictions = await model!.estimateFaces(imageElement, false);
  return predictions;
};

export const cropFaceFromImage = async (
  imageElement: HTMLImageElement | HTMLVideoElement,
  canvas: HTMLCanvasElement
): Promise<string | null> => {
  try {
    const faces = await detectFaces(imageElement);
    
    if (faces.length === 0) {
      return null;
    }
    
    // Get the first detected face
    const face = faces[0];
    const { topLeft, bottomRight } = face;
    
    // Add some padding around the face
    const padding = {
      x: (bottomRight[0] - topLeft[0]) * 0.2,
      y: (bottomRight[1] - topLeft[1]) * 0.2
    };
    
    // Set canvas dimensions
    const width = bottomRight[0] - topLeft[0] + padding.x * 2;
    const height = bottomRight[1] - topLeft[1] + padding.y * 2;
    canvas.width = width;
    canvas.height = height;
    
    // Draw the cropped face onto the canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    ctx.drawImage(
      imageElement,
      topLeft[0] - padding.x,
      topLeft[1] - padding.y,
      width,
      height,
      0,
      0,
      width,
      height
    );
    
    // Return the face as a data URL
    return canvas.toDataURL('image/jpeg');
  } catch (error) {
    console.error('Error cropping face:', error);
    return null;
  }
};

export const extractFaceFeatures = async (
  faceImageData: string
): Promise<Float32Array | null> => {
  try {
    // In a real implementation, this would extract feature vectors
    // for face comparison. For now, we return a placeholder.
    return new Float32Array(128).fill(0.5);
  } catch (error) {
    console.error('Error extracting face features:', error);
    return null;
  }
};