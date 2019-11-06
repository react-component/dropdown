/* eslint-disable no-param-reassign */
export function sleep(timeout = 0) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

export function getPopupDomNode(wrapper) {
  return wrapper
    .find('Trigger')
    .instance()
    .getPopupDomNode();
}
