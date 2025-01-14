import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

const hf = new HfInference(process.env.HUGGINGFACE_API_TOKEN);

export async function POST(req: Request) {
  if (!process.env.HUGGINGFACE_API_TOKEN) {
    return NextResponse.json(
      { error: "API token not configured" },
      { status: 401 }
    );
  }

  try {
    const { prompt, style } = await req.json();

    // Create a more detailed prompt based on the selected style
    let styleDescription = "";
    switch (style) {
      case "scandinavian":
        styleDescription = "clean lines, light woods, minimal decor, white walls, natural light";
        break;
      case "industrial":
        styleDescription = "exposed brick, metal fixtures, raw materials, open space";
        break;
      case "bohemian":
        styleDescription = "colorful textiles, plants, mixed patterns, eclectic furniture";
        break;
      case "contemporary":
        styleDescription = "sleek finishes, neutral colors, clean lines, modern furniture";
        break;
      case "mid-century modern":
        styleDescription = "organic shapes, wooden furniture, retro elements, clean lines";
        break;
      default:
        styleDescription = "modern minimalist style, clean and uncluttered";
    }

    const fullPrompt = `Create an interior design: ${prompt}. Style should be ${styleDescription}. Make it photorealistic, high quality, with professional lighting and architectural details`;

    console.log('Starting image generation with prompt:', fullPrompt);
    
    const response = await hf.textToImage({
      model: "runwayml/stable-diffusion-v1-5",
      inputs: fullPrompt,
      parameters: {
        negative_prompt: "ugly, deformed, bad architecture, poor quality, blurry, cluttered",
        num_inference_steps: 50,
        guidance_scale: 7.5,
        width: 1024,
        height: 768
      }
    });

    const responseBuffer = Buffer.from(await response.arrayBuffer());
    const responseBase64 = responseBuffer.toString('base64');
    const dataUrl = `data:image/jpeg;base64,${responseBase64}`;

    return NextResponse.json({ 
      result: dataUrl,
      usedPrompt: fullPrompt // Sending back the prompt for reference
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 
