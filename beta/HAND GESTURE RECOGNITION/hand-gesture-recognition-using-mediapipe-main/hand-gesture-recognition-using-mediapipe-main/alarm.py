import pygame

# Initialize the pygame mixer
pygame.mixer.init()

# Load the audio file (replace 'audio_file.mp3' with the path to your audio file)
audio_file_path = 'alarm.mp3'
pygame.mixer.music.load(audio_file_path)

# Play the audio file
pygame.mixer.music.play()

# Add a delay to allow the audio to finish playing (adjust the delay time as needed)
pygame.time.wait(5000)  # This will wait for 5 seconds (5000 milliseconds)

# Stop the audio playback
pygame.mixer.music.stop()

# Quit pygame mixer
pygame.mixer.quit()
