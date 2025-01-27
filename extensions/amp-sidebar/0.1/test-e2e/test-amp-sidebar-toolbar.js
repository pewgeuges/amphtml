/**
 * Copyright 2020 The AMP HTML Authors. All Rights Reserved.
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
  'amp-sidebar with toolbar',
  {
    fixture: 'amp-sidebar/amp-sidebar-toolbar.html',
    environments: ['single', 'viewer-demo'],
  },
  (env) => {
    let controller;

    beforeEach(() => {
      controller = env.controller;
    });

    it('should trigger the toolbar layout when viewport is resized', async () => {
      await controller.setWindowRect({width: 800, height: 600});

      const navElement = await controller.findElement('#nav-target-element');
      await expect(controller.getElementProperty(navElement, 'hidden')).to.be
        .false;

      // change orientation to potrait mode.
      await controller.setWindowRect({width: 600, height: 800});
      await expect(controller.getElementProperty(navElement, 'hidden')).to.be
        .true;

      // revert to landscape mode.
      await controller.setWindowRect({width: 800, height: 600});
      await expect(controller.getElementProperty(navElement, 'hidden')).to.be
        .false;
    });
  }
);
