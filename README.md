### development

Use jekyll: `bundle exec jekyll serve`
Visit: http://127.0.0.1:4000

### deployment

After building (`jekyll build` should do it, or it will be built if you are
running `jekyll serve`),
use surge: `surge _site`

### Adding a meeting image

Cp the image into `assets/images/originals`
Mv the image into `assets/images/meetings`
Edit `_data/meetings.json` and add the path to the asset
Adjust image size to about 700x400 px

### adding new books

- Use http://www.isbnsearch.org/search?s=armada to find isbns.
- Copy the ISBN (10)
- Add a new meeting in data/meetings.json
- Note: Some books appear to not have 10-digit ISBN numbers. In this case you
  should be able to use the Amazon ASIN instead
  More info on constructing Amazon image URLs: https://www.oreilly.com/library/view/amazon-hacks/0596005423/ch01s07.html

### layout

- The main index template is at index.html.
- The built site is in `_site`
- The assets (including css and js) go in assets/

### attribution:

- cover book image
  https://www.flickr.com/photos/leonhg/411756099/in/photolist-ComK6-2iZSdC-99ULgu-7Cby3b-2oadkC-pxTUks-9wjGjC-cKSpeW-zXqL6-7aknD9-eiDuNJ-d7ko8b-nzdg6p-8DFBf3-5bRCWE-7AWfbA-9NCKHD-2jZACS-dDYLCT-dDYLw4-cPv9EA-9yM1p3-rmJnqK-21PxDD-fbNGSb-bqYJ4V-8xbeMi-7xWWxL-qhPNrE-6FfP8X-qpXh2x-xrzT4-6FjWv7-6snYp8-yePbY-djixNF-5kcBiR-8d28vS-yePnu-5jmw5T-6owbY9-fZqUJk-rSudPP-cXskZ7-yeMi9-8kTvTL-AbebU-rmB8di-yeN29-poqgRR
- bg image https://subtlepatterns.com/paper-3/
- favicon book Book by Maxim Kulikov from the Noun Project https://thenounproject.com/search/?q=book&i=787671
