import pytesseract
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

app = FastAPI()

# Enable CORS for all routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_text_from_image(file: UploadFile = File(...)):
    try:
        # Set the path to the tesseract executable
        pytesseract.pytesseract.tesseract_cmd = '/usr/local/bin/tesseract'

        # Open the image using Pillow
        img = Image.open(file.file)

        # Use Tesseract to extract text
        text = pytesseract.image_to_string(img)

        return text
    except Exception as e:
        return str(e)

@app.post("/extract_text")
async def extract_text_route(file: UploadFile = File(...)):
    text = extract_text_from_image(file)
    return {"text": text}
