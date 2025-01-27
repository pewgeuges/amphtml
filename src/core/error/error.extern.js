/**
 * Copyright 2021 The AMP HTML Authors. All Rights Reserved.
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

/**
 * @fileoverview Externs for extra properties expected on errors.
 * @externs
 */

/**
 * Array of strings and values used to construct an error message, so that when
 * it's logged to the console the output can be inspected.
 * @type {undefined|Array<*>}
 */
Error.prototype.messageArray;

/**
 * Flag to mark "expected" failure cases (ex. an operation failing due to a
 * known browser setting blocking access to `localStorage`).
 * @type {undefined|boolean}
 */
Error.prototype.expected;
