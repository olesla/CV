# CV

Curriculum vitae generator

## Usage

```bash
$ git clone git@github.com:olesla/CV.git
$ cd cv
$ npm install
$ cp data.example.json data.json
$ npm run build
```

This will create a `cv.pdf` file in the root folder.

## Data

Supply `data.json` with your details, and replace the placeholder `profile.jpg` picture with your own.

## Modifications

You can run `npm run dev` to regenerate `cv.pdf` whenever you make changes. Modify `template.html` and `style.sass` to your needs
