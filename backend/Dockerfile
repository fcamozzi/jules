# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app/backend

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project code
COPY . .

# Copy and make the run script executable
COPY run.sh .
RUN chmod +x ./run.sh

# Expose port 8000 to the outside world
EXPOSE 8000

# Run the script
CMD ["./run.sh"]
