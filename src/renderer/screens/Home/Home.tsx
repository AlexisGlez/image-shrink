import * as path from 'path'
import * as os from 'os'
import { ipcRenderer } from 'electron'

import * as React from 'react'

import './Home.css'

export const Home: React.FC<{}> = () => {
  const imageField = React.useRef<HTMLInputElement>(null)
  const sliderField = React.useRef<HTMLInputElement>(null)

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!imageField.current || !imageField.current.files || !imageField.current.files[0]) {
      return
    }

    const imgPath = imageField.current.files[0].path

    if (!sliderField.current) {
      return
    }

    const quality = sliderField.current.value

    console.log(imgPath, quality)

    ipcRenderer.send('image:minimize', {
      imgPath,
      quality,
    })
  }

  ipcRenderer.on('image:done', () => {
    if (!sliderField.current) {
      return
    }

    // @ts-ignore: "M" is coming from materialize global variable
    M.toast({
      html: `Image resized to ${sliderField.current.value}% quality`,
    })
  })

  return (
    <div className="container center-align">
      <h3>
        <i className="fas fa-images"></i> ImageShrink
      </h3>
      <p>Choose an image to resize</p>

      <form id="image-form" onSubmit={onFormSubmit}>
        <div className="file-field input-field">
          <div className="btn w-full">
            <span>Browse</span>
            <input type="file" id="img" ref={imageField} />
          </div>

          <div className="file-path-wrapper">
            <input type="text" className="file-path validate" placeholder="Upload file" />
          </div>
        </div>

        <p>
          <strong>Quality:</strong>
          <em>The lower the quality, the smaller the file size</em>
        </p>

        <p className="range-field">
          <input type="range" min="0" max="100" id="slider" ref={sliderField} />
        </p>

        <input type="submit" value="Resize" className="btn w-full black" />
      </form>

      <div className="card output">
        <div className="card-content">
          Output Path: <span id="output-path">{path.join(os.homedir(), 'image-shrink')}</span>
        </div>
      </div>
    </div>
  )
}
