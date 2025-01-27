/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

import {
  stubCollapseFrameForTesting,
  stubExpandFrameForTesting,
} from '#ads/inabox/frame-overlay-helper';
import {FrameOverlayManager} from '#ads/inabox/frame-overlay-manager';

const NOOP = () => {};

describes.fakeWin('inabox-host:FrameOverlayManager', {}, (env) => {
  let win;
  let addEventListenerSpy;

  let manager;

  beforeEach(() => {
    win = env.win;
    addEventListenerSpy = env.sandbox.spy(win, 'addEventListener');

    manager = new FrameOverlayManager(win);
  });

  it('should listen to window resize event', () => {
    expect(addEventListenerSpy).to.have.been.calledWith(
      'resize',
      env.sandbox.match.any
    );
  });

  it('should expand frame and execute callback', () => {
    const expandedRect = {a: 2, b: 3};
    const iframe = {};

    const expandFrame = env.sandbox.spy((win, iframe, onFinish) => {
      onFinish({}, expandedRect);
    });

    const callback = env.sandbox.spy();

    stubExpandFrameForTesting(expandFrame);

    manager.expandFrame(iframe, callback);

    expect(callback).to.have.been.calledWith(expandedRect);
    expect(expandFrame).to.have.been.calledWith(
      win,
      iframe,
      env.sandbox.match.any
    );
  });

  it('should collapse frame and execute callback with remeasured box', () => {
    const remeasuredCollapsedRect = {a: 2, b: 3};
    const iframe = {};

    const collapseFrame = env.sandbox.spy(
      (win, iframe, onFinish, onRemeasure) => {
        onFinish();
        onRemeasure(remeasuredCollapsedRect);
      }
    );

    const callback = env.sandbox.spy();

    stubCollapseFrameForTesting(collapseFrame);
    stubExpandFrameForTesting((win, iframe, onFinish) => onFinish({}, {}));

    manager.expandFrame(iframe, NOOP);
    manager.onWindowResize();
    manager.collapseFrame(iframe, callback);

    expect(callback).to.have.been.calledWith(remeasuredCollapsedRect);
    expect(collapseFrame).to.have.been.calledWith(
      win,
      iframe,
      env.sandbox.match.any,
      env.sandbox.match.any
    );
  });

  it('should collapse frame and execute callback with known box rect', () => {
    const knownBoxRect = {a: 2, b: 3};

    const iframe = {};

    const collapseFrame = env.sandbox.spy(
      (win, iframe, onFinish, onRemeasure) => {
        onFinish();
        onRemeasure({});
      }
    );

    const callback = env.sandbox.spy();

    stubCollapseFrameForTesting(collapseFrame);
    stubExpandFrameForTesting((win, iframe, onFinish) =>
      onFinish(knownBoxRect, {})
    );

    manager.expandFrame(iframe, NOOP);
    manager.collapseFrame(iframe, callback);

    expect(callback).to.have.been.calledWith(knownBoxRect);
    expect(collapseFrame).to.have.been.calledWith(
      win,
      iframe,
      env.sandbox.match.any,
      env.sandbox.match.any
    );
  });
});
