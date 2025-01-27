/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

describes.endtoend(
  'amp-form',
  {
    fixture: 'amp-form/amp-form.html',
    environments: ['single'],
  },
  (env) => {
    let controller;

    beforeEach(() => {
      controller = env.controller;
    });

    it('should render form response', async () => {
      const searchInput = await controller.findElement(
        '#xhr-get input[name=term]'
      );
      await controller.type(searchInput, 'search term');
      const submitForm = await controller.findElement(
        '#xhr-get input[type=submit]'
      );
      await controller.click(submitForm);

      const renderedTemplate = await controller.findElement(
        'div[i-amphtml-rendered]'
      );
      await expect(controller.getElementText(renderedTemplate)).to.equal(
        'Here are the results for the search:\nResult 1\nResult 2\nResult 3'
      );
    });
  }
);

describes.endtoend(
  'amp-form SSR templates',
  {
    fixture: 'amp-form/amp-form.html',
    environments: ['viewer-demo'],
  },
  (env) => {
    let controller;

    beforeEach(() => {
      controller = env.controller;
    });

    // TODO(estherkim): fails in viewer
    it.configure()
      .skipViewerDemo()
      .run('should render form response', async () => {
        const searchInput = await controller.findElement(
          '#xhr-get input[name=term]'
        );
        await controller.type(searchInput, 'search term');
        const submitForm = await controller.findElement(
          '#xhr-get input[type=submit]'
        );
        await controller.click(submitForm);

        const renderedTemplate = await controller.findElement(
          'div[i-amphtml-rendered]'
        );
        await expect(controller.getElementText(renderedTemplate)).to.equal(
          'SSR response'
        );
      });
  }
);
