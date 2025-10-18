var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __pow = Math.pow;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __restKey = (key) => typeof key === "symbol" ? key : key + "";
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
(function() {
  "use strict";
  var _provider, _providerCalled, _a, _focused, _cleanup, _setup, _b, _online, _cleanup2, _setup2, _c, _gcTimeout, _d, _initialState, _revertState, _cache, _client, _retryer, _defaultOptions, _abortSignalConsumed, _Query_instances, dispatch_fn, _e, _client2, _currentQuery, _currentQueryInitialState, _currentResult, _currentResultState, _currentResultOptions, _currentThenable, _selectError, _selectFn, _selectResult, _lastQueryWithDefinedData, _staleTimeoutId, _refetchIntervalId, _currentRefetchInterval, _trackedProps, _QueryObserver_instances, executeFetch_fn, updateStaleTimeout_fn, computeRefetchInterval_fn, updateRefetchInterval_fn, updateTimers_fn, clearStaleTimeout_fn, clearRefetchInterval_fn, updateQuery_fn, notify_fn, _g, _client3, _observers, _mutationCache, _retryer2, _Mutation_instances, dispatch_fn2, _h, _mutations, _scopes, _mutationId, _i, _client4, _currentResult2, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn2, _j, _queries, _k, _queryCache, _mutationCache2, _defaultOptions2, _queryDefaults, _mutationDefaults, _mountCount, _unsubscribeFocus, _unsubscribeOnline, _l;
  var __vite_style__ = document.createElement("style");
  __vite_style__.textContent = `/* Management Modal Styles */\r
.modal--large {\r
  max-width: 800px;\r
  width: 95%;\r
}\r
\r
.modal--small {\r
  max-width: 400px;\r
  width: 90%;\r
}\r
\r
.modal__header {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
  margin-bottom: 1.5rem;\r
  padding-bottom: 1rem;\r
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\r
}\r
\r
.modal__close {\r
  background: none;\r
  border: none;\r
  color: rgba(255, 255, 255, 0.6);\r
  font-size: 1.5rem;\r
  cursor: pointer;\r
  padding: 0.25rem;\r
  border-radius: 50%;\r
  width: 32px;\r
  height: 32px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  transition: all 0.2s ease;\r
}\r
\r
.modal__close:hover {\r
  background: rgba(255, 255, 255, 0.1);\r
  color: rgba(255, 255, 255, 0.9);\r
}\r
\r
.modal__tabs {\r
  display: flex;\r
  gap: 0.5rem;\r
  margin-bottom: 2rem;\r
  background: rgba(18, 24, 38, 0.4);\r
  padding: 0.5rem;\r
  border-radius: 12px;\r
}\r
\r
.modal__tab {\r
  flex: 1;\r
  padding: 0.75rem 1rem;\r
  border-radius: 8px;\r
  border: none;\r
  background: transparent;\r
  color: rgba(255, 255, 255, 0.6);\r
  font-size: 0.95rem;\r
  font-weight: 500;\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
}\r
\r
.modal__tab:hover {\r
  background: rgba(255, 255, 255, 0.05);\r
  color: rgba(255, 255, 255, 0.8);\r
}\r
\r
.modal__tab--active {\r
  background: linear-gradient(135deg, #4f46e5, #6366f1);\r
  color: #fff;\r
}\r
\r
.modal__content {\r
  max-height: 60vh;\r
  overflow-y: auto;\r
}\r
\r
/* Management Sections */\r
.management-section {\r
  margin-bottom: 2rem;\r
}\r
\r
.management-section h3 {\r
  font-size: 1.5rem;\r
  margin-bottom: 0.5rem;\r
  color: #f0f4ff;\r
}\r
\r
.management-section__description {\r
  color: rgba(240, 244, 255, 0.7);\r
  margin-bottom: 1.5rem;\r
  font-size: 0.95rem;\r
}\r
\r
.management-actions {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 1rem;\r
}\r
\r
.management-card {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
  padding: 1.5rem;\r
  background: rgba(18, 24, 38, 0.6);\r
  border-radius: 12px;\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
}\r
\r
.management-card__info h4 {\r
  font-size: 1.1rem;\r
  margin-bottom: 0.5rem;\r
  color: #f0f4ff;\r
}\r
\r
.management-card__info p {\r
  color: rgba(240, 244, 255, 0.7);\r
  font-size: 0.9rem;\r
  margin-bottom: 0.5rem;\r
}\r
\r
.data-count {\r
  display: inline-block;\r
  padding: 0.25rem 0.75rem;\r
  background: rgba(79, 70, 229, 0.2);\r
  color: rgba(156, 163, 175, 0.9);\r
  border-radius: 16px;\r
  font-size: 0.8rem;\r
  font-weight: 500;\r
}\r
\r
/* Buttons */\r
.btn {\r
  padding: 0.75rem 1.5rem;\r
  border-radius: 8px;\r
  border: none;\r
  font-size: 0.95rem;\r
  font-weight: 600;\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
  white-space: nowrap;\r
}\r
\r
.btn--primary {\r
  background: linear-gradient(135deg, #4f46e5, #6366f1);\r
  color: #fff;\r
}\r
\r
.btn--primary:hover:not(:disabled) {\r
  background: linear-gradient(135deg, #4338ca, #4f46e5);\r
  transform: translateY(-1px);\r
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);\r
}\r
\r
.btn--secondary {\r
  background: rgba(255, 255, 255, 0.1);\r
  color: rgba(255, 255, 255, 0.8);\r
  border: 1px solid rgba(255, 255, 255, 0.2);\r
}\r
\r
.btn--secondary:hover {\r
  background: rgba(255, 255, 255, 0.15);\r
  color: rgba(255, 255, 255, 0.9);\r
}\r
\r
.btn--danger {\r
  background: rgba(248, 113, 113, 0.9);\r
  color: #fff;\r
}\r
\r
.btn--danger:hover:not(:disabled) {\r
  background: rgba(248, 113, 113, 1);\r
  transform: translateY(-1px);\r
  box-shadow: 0 4px 12px rgba(248, 113, 113, 0.4);\r
}\r
\r
.btn:disabled {\r
  opacity: 0.5;\r
  cursor: not-allowed;\r
  transform: none !important;\r
  box-shadow: none !important;\r
}\r
\r
/* Connection Test */\r
.connection-test {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 1rem;\r
}\r
\r
.connection-info {\r
  background: rgba(18, 24, 38, 0.6);\r
  padding: 1rem;\r
  border-radius: 8px;\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
}\r
\r
.connection-info p {\r
  margin: 0.5rem 0;\r
  color: rgba(240, 244, 255, 0.8);\r
}\r
\r
.connection-result {\r
  padding: 1rem;\r
  border-radius: 8px;\r
  font-weight: 500;\r
}\r
\r
.connection-result.success {\r
  background: rgba(34, 197, 94, 0.1);\r
  color: #4ade80;\r
  border: 1px solid rgba(34, 197, 94, 0.3);\r
}\r
\r
.connection-result.error {\r
  background: rgba(248, 113, 113, 0.1);\r
  color: #f87171;\r
  border: 1px solid rgba(248, 113, 113, 0.3);\r
}\r
\r
/* Account Management */\r
.account-info {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 1rem;\r
}\r
\r
.account-field {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
  padding: 1rem;\r
  background: rgba(18, 24, 38, 0.6);\r
  border-radius: 8px;\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
}\r
\r
.account-field label {\r
  font-weight: 500;\r
  color: rgba(240, 244, 255, 0.8);\r
}\r
\r
.account-field span {\r
  color: #f0f4ff;\r
  font-family: monospace;\r
}\r
\r
.account-actions {\r
  display: flex;\r
  gap: 1rem;\r
  margin-top: 1rem;\r
}\r
\r
.credential-edit {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 1rem;\r
}\r
\r
.credential-edit label {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 0.5rem;\r
  font-size: 0.95rem;\r
  color: rgba(240, 244, 255, 0.8);\r
}\r
\r
.credential-edit input {\r
  padding: 0.75rem;\r
  border-radius: 8px;\r
  border: 1px solid rgba(255, 255, 255, 0.2);\r
  background: rgba(18, 24, 38, 0.6);\r
  color: #f0f4ff;\r
  font-size: 0.95rem;\r
}\r
\r
.credential-edit input:focus {\r
  outline: none;\r
  border-color: rgba(79, 70, 229, 0.6);\r
  background: rgba(18, 24, 38, 0.8);\r
}\r
\r
.credential-actions {\r
  display: flex;\r
  gap: 1rem;\r
  margin-top: 1rem;\r
}\r
\r
/* Mobile responsiveness */\r
@media (max-width: 768px) {\r
  .modal--large {\r
    width: 98%;\r
    max-height: 90vh;\r
  }\r
  \r
  .modal__tabs {\r
    flex-wrap: wrap;\r
  }\r
  \r
  .modal__tab {\r
    font-size: 0.85rem;\r
    padding: 0.5rem 0.75rem;\r
  }\r
  \r
  .management-card {\r
    flex-direction: column;\r
    align-items: stretch;\r
    gap: 1rem;\r
  }\r
  \r
  .account-actions,\r
  .credential-actions {\r
    flex-direction: column;\r
  }\r
}/* Favorites Modal Styles */\r
.favorites-modal {\r
  max-width: 1000px;\r
  width: 95%;\r
  max-height: 85vh;\r
}\r
\r
.favorites-header {\r
  display: flex;\r
  align-items: center;\r
  gap: 1rem;\r
}\r
\r
.favorites-count {\r
  background: rgba(79, 70, 229, 0.2);\r
  color: rgba(156, 163, 175, 0.9);\r
  padding: 0.25rem 0.75rem;\r
  border-radius: 16px;\r
  font-size: 0.8rem;\r
  font-weight: 500;\r
}\r
\r
/* Empty State */\r
.favorites-empty {\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 3rem 2rem;\r
  text-align: center;\r
}\r
\r
.favorites-empty__icon {\r
  font-size: 4rem;\r
  margin-bottom: 1rem;\r
  opacity: 0.6;\r
}\r
\r
.favorites-empty h3 {\r
  font-size: 1.5rem;\r
  margin-bottom: 0.5rem;\r
  color: #f0f4ff;\r
}\r
\r
.favorites-empty p {\r
  color: rgba(240, 244, 255, 0.7);\r
  margin-bottom: 2rem;\r
  max-width: 400px;\r
}\r
\r
/* Controls */\r
.favorites-controls {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
  margin-bottom: 1.5rem;\r
  padding: 1rem;\r
  background: rgba(18, 24, 38, 0.4);\r
  border-radius: 12px;\r
}\r
\r
.favorites-sort {\r
  display: flex;\r
  align-items: center;\r
  gap: 0.5rem;\r
}\r
\r
.favorites-sort label {\r
  color: rgba(240, 244, 255, 0.8);\r
  font-size: 0.9rem;\r
}\r
\r
.favorites-sort select {\r
  padding: 0.5rem;\r
  border-radius: 8px;\r
  border: 1px solid rgba(255, 255, 255, 0.2);\r
  background: rgba(18, 24, 38, 0.6);\r
  color: #f0f4ff;\r
  font-size: 0.9rem;\r
}\r
\r
.favorites-sort select:focus {\r
  outline: none;\r
  border-color: rgba(79, 70, 229, 0.6);\r
}\r
\r
.favorites-profile {\r
  color: rgba(240, 244, 255, 0.8);\r
  font-size: 0.9rem;\r
}\r
\r
.favorites-profile strong {\r
  color: #f0f4ff;\r
}\r
\r
/* Grid */\r
.favorites-grid {\r
  display: grid;\r
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\r
  gap: 1rem;\r
  max-height: 50vh;\r
  overflow-y: auto;\r
  padding-right: 0.5rem;\r
}\r
\r
/* Custom scrollbar */\r
.favorites-grid::-webkit-scrollbar {\r
  width: 8px;\r
}\r
\r
.favorites-grid::-webkit-scrollbar-track {\r
  background: rgba(18, 24, 38, 0.4);\r
  border-radius: 4px;\r
}\r
\r
.favorites-grid::-webkit-scrollbar-thumb {\r
  background: rgba(79, 70, 229, 0.6);\r
  border-radius: 4px;\r
}\r
\r
.favorites-grid::-webkit-scrollbar-thumb:hover {\r
  background: rgba(79, 70, 229, 0.8);\r
}\r
\r
/* Favorite Item */\r
.favorite-item {\r
  display: flex;\r
  gap: 1rem;\r
  padding: 1rem;\r
  background: rgba(18, 24, 38, 0.6);\r
  border-radius: 12px;\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
  position: relative;\r
}\r
\r
.favorite-item:hover {\r
  background: rgba(18, 24, 38, 0.8);\r
  border-color: rgba(79, 70, 229, 0.4);\r
  transform: translateY(-2px);\r
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\r
}\r
\r
.favorite-item__poster {\r
  width: 60px;\r
  height: 90px;\r
  border-radius: 8px;\r
  overflow: hidden;\r
  flex-shrink: 0;\r
  background: rgba(255, 255, 255, 0.1);\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
.favorite-item__poster img {\r
  width: 100%;\r
  height: 100%;\r
  object-fit: cover;\r
}\r
\r
.favorite-item__poster-placeholder {\r
  font-size: 1.5rem;\r
  color: rgba(255, 255, 255, 0.6);\r
}\r
\r
.favorite-item__info {\r
  flex: 1;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 0.5rem;\r
  min-width: 0;\r
}\r
\r
.favorite-item__title {\r
  font-size: 1rem;\r
  font-weight: 600;\r
  color: #f0f4ff;\r
  margin: 0;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
}\r
\r
.favorite-item__meta {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 0.25rem;\r
}\r
\r
.favorite-item__type {\r
  font-size: 0.8rem;\r
  padding: 0.25rem 0.5rem;\r
  border-radius: 12px;\r
  font-weight: 500;\r
  width: fit-content;\r
}\r
\r
.favorite-item__type--movie {\r
  background: rgba(34, 197, 94, 0.2);\r
  color: #4ade80;\r
}\r
\r
.favorite-item__type--series {\r
  background: rgba(59, 130, 246, 0.2);\r
  color: #60a5fa;\r
}\r
\r
.favorite-item__date {\r
  font-size: 0.75rem;\r
  color: rgba(240, 244, 255, 0.6);\r
}\r
\r
.favorite-item__remove {\r
  position: absolute;\r
  top: 0.5rem;\r
  right: 0.5rem;\r
  width: 24px;\r
  height: 24px;\r
  border-radius: 50%;\r
  border: none;\r
  background: rgba(248, 113, 113, 0.9);\r
  color: #fff;\r
  font-size: 0.7rem;\r
  cursor: pointer;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  opacity: 0;\r
  transform: scale(0.8);\r
  transition: all 0.2s ease;\r
}\r
\r
.favorite-item:hover .favorite-item__remove {\r
  opacity: 1;\r
  transform: scale(1);\r
}\r
\r
.favorite-item__remove:hover {\r
  background: rgba(248, 113, 113, 1);\r
  transform: scale(1.1);\r
}\r
\r
/* Mobile responsiveness */\r
@media (max-width: 768px) {\r
  .favorites-modal {\r
    width: 98%;\r
    max-height: 90vh;\r
  }\r
  \r
  .favorites-controls {\r
    flex-direction: column;\r
    gap: 1rem;\r
    align-items: stretch;\r
  }\r
  \r
  .favorites-grid {\r
    grid-template-columns: 1fr;\r
    gap: 0.75rem;\r
  }\r
  \r
  .favorite-item {\r
    padding: 0.75rem;\r
  }\r
  \r
  .favorite-item__poster {\r
    width: 50px;\r
    height: 75px;\r
  }\r
  \r
  .favorite-item__title {\r
    font-size: 0.9rem;\r
  }\r
}/* Global Search */\r
.global-search {\r
  position: fixed;\r
  inset: 0;\r
  z-index: 10000;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
.global-search__overlay {\r
  position: absolute;\r
  inset: 0;\r
  background: rgba(0, 0, 0, 0.8);\r
  backdrop-filter: blur(4px);\r
}\r
\r
.global-search__modal {\r
  position: relative;\r
  width: 90%;\r
  max-width: 1000px;\r
  max-height: 85vh;\r
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);\r
  border-radius: 16px;\r
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);\r
  display: flex;\r
  flex-direction: column;\r
  overflow: hidden;\r
}\r
\r
.global-search__header {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
  padding: 1.5rem 2rem;\r
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\r
}\r
\r
.global-search__header h2 {\r
  font-size: 1.5rem;\r
  font-weight: 600;\r
  color: #fff;\r
}\r
\r
.global-search__close {\r
  width: 36px;\r
  height: 36px;\r
  border-radius: 50%;\r
  border: none;\r
  background: rgba(255, 255, 255, 0.1);\r
  color: #fff;\r
  font-size: 1.25rem;\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
}\r
\r
.global-search__close:hover {\r
  background: rgba(255, 255, 255, 0.2);\r
  transform: scale(1.1);\r
}\r
\r
.global-search__filters {\r
  padding: 1.5rem 2rem;\r
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\r
}\r
\r
.global-search__input {\r
  width: 100%;\r
  padding: 0.875rem 1.25rem;\r
  border-radius: 12px;\r
  border: 1px solid rgba(255, 255, 255, 0.2);\r
  background: rgba(255, 255, 255, 0.05);\r
  color: #fff;\r
  font-size: 1rem;\r
  margin-bottom: 1rem;\r
  transition: all 0.2s ease;\r
}\r
\r
.global-search__input:focus {\r
  outline: none;\r
  border-color: #6366f1;\r
  background: rgba(255, 255, 255, 0.08);\r
}\r
\r
.global-search__input::placeholder {\r
  color: rgba(255, 255, 255, 0.4);\r
}\r
\r
.global-search__filter-row {\r
  display: grid;\r
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\r
  gap: 1rem;\r
}\r
\r
.global-search__select {\r
  padding: 0.75rem 1rem;\r
  border-radius: 8px;\r
  border: 1px solid rgba(255, 255, 255, 0.2);\r
  background: rgba(255, 255, 255, 0.05);\r
  color: #fff;\r
  font-size: 0.95rem;\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
}\r
\r
.global-search__select:focus {\r
  outline: none;\r
  border-color: #6366f1;\r
  background: rgba(255, 255, 255, 0.08);\r
}\r
\r
.global-search__select option {\r
  background: #1e293b;\r
  color: #fff;\r
}\r
\r
.global-search__results {\r
  flex: 1;\r
  overflow: hidden;\r
  display: flex;\r
  flex-direction: column;\r
}\r
\r
.global-search__loading,\r
.global-search__empty {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 3rem;\r
  color: rgba(255, 255, 255, 0.6);\r
  font-size: 1.125rem;\r
}\r
\r
.global-search__count {\r
  padding: 1rem 2rem;\r
  color: rgba(255, 255, 255, 0.7);\r
  font-size: 0.95rem;\r
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\r
}\r
\r
.global-search__list {\r
  flex: 1;\r
  overflow-y: auto;\r
  padding: 1rem 2rem 2rem;\r
  display: grid;\r
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\r
  gap: 1rem;\r
  align-content: start;\r
}\r
\r
.global-search__list::-webkit-scrollbar {\r
  width: 8px;\r
}\r
\r
.global-search__list::-webkit-scrollbar-track {\r
  background: rgba(255, 255, 255, 0.05);\r
}\r
\r
.global-search__list::-webkit-scrollbar-thumb {\r
  background: rgba(255, 255, 255, 0.2);\r
  border-radius: 4px;\r
}\r
\r
.global-search__list::-webkit-scrollbar-thumb:hover {\r
  background: rgba(255, 255, 255, 0.3);\r
}\r
\r
.global-search__item {\r
  display: flex;\r
  flex-direction: column;\r
  border-radius: 12px;\r
  overflow: hidden;\r
  background: rgba(255, 255, 255, 0.05);\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
  text-align: left;\r
  padding: 0;\r
}\r
\r
.global-search__item:hover {\r
  transform: translateY(-4px);\r
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);\r
  border-color: rgba(99, 102, 241, 0.5);\r
}\r
\r
.global-search__item-poster {\r
  position: relative;\r
  width: 100%;\r
  padding-top: 140%;\r
  background: linear-gradient(135deg, #1e293b, #334155);\r
  overflow: hidden;\r
}\r
\r
.global-search__item-poster img {\r
  position: absolute;\r
  inset: 0;\r
  width: 100%;\r
  height: 100%;\r
  object-fit: cover;\r
}\r
\r
.global-search__item-placeholder {\r
  position: absolute;\r
  inset: 0;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-size: 3rem;\r
  font-weight: 700;\r
  color: rgba(255, 255, 255, 0.3);\r
  text-transform: uppercase;\r
}\r
\r
.global-search__item-info {\r
  padding: 0.875rem;\r
}\r
\r
.global-search__item-info h3 {\r
  font-size: 0.95rem;\r
  font-weight: 600;\r
  color: #fff;\r
  margin-bottom: 0.5rem;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  display: -webkit-box;\r
  -webkit-line-clamp: 2;\r
  -webkit-box-orient: vertical;\r
  line-height: 1.3;\r
}\r
\r
.global-search__item-meta {\r
  display: flex;\r
  align-items: center;\r
  gap: 0.75rem;\r
  font-size: 0.8rem;\r
}\r
\r
.global-search__item-type {\r
  color: rgba(255, 255, 255, 0.6);\r
}\r
\r
.global-search__item-rating {\r
  color: #fbbf24;\r
  font-weight: 600;\r
}\r
/* Player Overlay */\r
.player-overlay {\r
  position: fixed;\r
  inset: 0;\r
  background: #000;\r
  z-index: 10000;\r
  display: flex;\r
  flex-direction: column;\r
}\r
\r
.player-overlay__video {\r
  width: 100%;\r
  height: 100%;\r
  object-fit: contain;\r
}\r
\r
.player-overlay__error {\r
  position: absolute;\r
  top: 50%;\r
  left: 50%;\r
  transform: translate(-50%, -50%);\r
  background: rgba(0, 0, 0, 0.9);\r
  padding: 2rem;\r
  border-radius: 16px;\r
  text-align: center;\r
  z-index: 10001;\r
}\r
\r
.player-overlay__error p {\r
  margin-bottom: 1.5rem;\r
  color: #f87171;\r
  font-size: 1.125rem;\r
}\r
\r
.player-overlay__error button {\r
  padding: 0.75rem 2rem;\r
  border-radius: 8px;\r
  border: none;\r
  background: linear-gradient(135deg, #4f46e5, #6366f1);\r
  color: #fff;\r
  font-size: 1rem;\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
}\r
\r
.player-overlay__error button:hover {\r
  background: linear-gradient(135deg, #4338ca, #4f46e5);\r
}\r
\r
.player-overlay__controls {\r
  position: absolute;\r
  bottom: 0;\r
  left: 0;\r
  right: 0;\r
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);\r
  padding: 3rem 2rem 2rem;\r
  transition: opacity 0.3s ease, transform 0.3s ease;\r
  opacity: 1;\r
  transform: translateY(0);\r
}\r
\r
.player-overlay__controls--hidden {\r
  opacity: 0;\r
  transform: translateY(20px);\r
  pointer-events: none;\r
}\r
\r
.player-overlay__header {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
  margin-bottom: 1.5rem;\r
}\r
\r
.player-overlay__header h2 {\r
  font-size: 1.5rem;\r
  font-weight: 600;\r
  color: #fff;\r
}\r
\r
.player-overlay__close {\r
  width: 40px;\r
  height: 40px;\r
  border-radius: 50%;\r
  border: none;\r
  background: rgba(255, 255, 255, 0.1);\r
  color: #fff;\r
  font-size: 1.5rem;\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
}\r
\r
.player-overlay__close:hover {\r
  background: rgba(255, 255, 255, 0.2);\r
  transform: scale(1.1);\r
}\r
\r
.player-overlay__progress {\r
  margin-bottom: 1rem;\r
}\r
\r
.player-overlay__progress-bar {\r
  height: 6px;\r
  background: rgba(255, 255, 255, 0.2);\r
  border-radius: 3px;\r
  overflow: hidden;\r
  cursor: pointer;\r
  margin-bottom: 0.5rem;\r
}\r
\r
.player-overlay__progress-fill {\r
  height: 100%;\r
  background: linear-gradient(90deg, #4f46e5, #6366f1);\r
  border-radius: 3px;\r
  transition: width 0.1s linear;\r
}\r
\r
.player-overlay__time {\r
  display: flex;\r
  justify-content: space-between;\r
  font-size: 0.875rem;\r
  color: rgba(255, 255, 255, 0.7);\r
}\r
\r
.player-overlay__buttons {\r
  display: flex;\r
  align-items: center;\r
  gap: 1rem;\r
}\r
\r
.player-overlay__buttons button {\r
  padding: 0.625rem 1.25rem;\r
  border-radius: 8px;\r
  border: none;\r
  background: rgba(255, 255, 255, 0.1);\r
  color: #fff;\r
  font-size: 0.95rem;\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
  white-space: nowrap;\r
}\r
\r
.player-overlay__buttons button:hover {\r
  background: rgba(255, 255, 255, 0.2);\r
  transform: translateY(-1px);\r
}\r
\r
.player-overlay__volume {\r
  display: flex;\r
  align-items: center;\r
  gap: 0.5rem;\r
  margin-left: auto;\r
}\r
\r
.player-overlay__volume button {\r
  padding: 0.5rem;\r
  width: 36px;\r
  height: 36px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
.player-overlay__volume-bar {\r
  width: 80px;\r
  height: 4px;\r
  background: rgba(255, 255, 255, 0.2);\r
  border-radius: 2px;\r
  overflow: hidden;\r
}\r
\r
.player-overlay__volume-fill {\r
  height: 100%;\r
  background: #fff;\r
  transition: width 0.1s ease;\r
}\r
/* Series Selector */\r
.series-selector {\r
  position: fixed;\r
  inset: 0;\r
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);\r
  z-index: 9999;\r
  display: flex;\r
  flex-direction: column;\r
  overflow: hidden;\r
}\r
\r
.series-selector__header {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
  padding: 2rem;\r
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\r
}\r
\r
.series-selector__header h2 {\r
  font-size: 1.75rem;\r
  font-weight: 600;\r
  color: #fff;\r
}\r
\r
.series-selector__close {\r
  width: 40px;\r
  height: 40px;\r
  border-radius: 50%;\r
  border: none;\r
  background: rgba(255, 255, 255, 0.1);\r
  color: #fff;\r
  font-size: 1.5rem;\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
}\r
\r
.series-selector__close:hover {\r
  background: rgba(255, 255, 255, 0.2);\r
  transform: scale(1.1);\r
}\r
\r
.series-selector__loading,\r
.series-selector__error {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  flex: 1;\r
  font-size: 1.125rem;\r
  color: rgba(255, 255, 255, 0.7);\r
}\r
\r
.series-selector__error {\r
  color: #f87171;\r
}\r
\r
.series-selector__content {\r
  display: grid;\r
  grid-template-columns: 250px 1fr;\r
  gap: 2rem;\r
  padding: 2rem;\r
  overflow: hidden;\r
  flex: 1;\r
}\r
\r
.series-selector__seasons h3,\r
.series-selector__episodes h3 {\r
  font-size: 1.125rem;\r
  font-weight: 600;\r
  color: #fff;\r
  margin-bottom: 1rem;\r
}\r
\r
.series-selector__season-list {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 0.5rem;\r
}\r
\r
.series-selector__season {\r
  padding: 0.75rem 1rem;\r
  border-radius: 8px;\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
  background: rgba(255, 255, 255, 0.05);\r
  color: rgba(255, 255, 255, 0.8);\r
  font-size: 0.95rem;\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
  text-align: left;\r
}\r
\r
.series-selector__season:hover {\r
  background: rgba(255, 255, 255, 0.1);\r
  border-color: rgba(99, 102, 241, 0.5);\r
}\r
\r
.series-selector__season--active {\r
  background: linear-gradient(135deg, #4f46e5, #6366f1);\r
  border-color: #6366f1;\r
  color: #fff;\r
  font-weight: 600;\r
}\r
\r
.series-selector__episode-list {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 0.75rem;\r
  overflow-y: auto;\r
  max-height: calc(100vh - 250px);\r
  padding-right: 0.5rem;\r
}\r
\r
.series-selector__episode-list::-webkit-scrollbar {\r
  width: 8px;\r
}\r
\r
.series-selector__episode-list::-webkit-scrollbar-track {\r
  background: rgba(255, 255, 255, 0.05);\r
  border-radius: 4px;\r
}\r
\r
.series-selector__episode-list::-webkit-scrollbar-thumb {\r
  background: rgba(255, 255, 255, 0.2);\r
  border-radius: 4px;\r
}\r
\r
.series-selector__episode-list::-webkit-scrollbar-thumb:hover {\r
  background: rgba(255, 255, 255, 0.3);\r
}\r
\r
.series-selector__episode {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
  gap: 1rem;\r
  padding: 1rem 1.25rem;\r
  border-radius: 8px;\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
  background: rgba(255, 255, 255, 0.05);\r
  transition: all 0.2s ease;\r
}\r
\r
.series-selector__episode:hover {\r
  background: rgba(255, 255, 255, 0.1);\r
  border-color: rgba(99, 102, 241, 0.5);\r
}\r
\r
.series-selector__episode-info {\r
  display: grid;\r
  grid-template-columns: auto 1fr auto;\r
  gap: 1rem;\r
  align-items: center;\r
  flex: 1;\r
}\r
\r
.series-selector__episode-num {\r
  font-weight: 700;\r
  color: #6366f1;\r
  font-size: 1.125rem;\r
}\r
\r
.series-selector__episode-title {\r
  color: rgba(255, 255, 255, 0.9);\r
}\r
\r
.series-selector__episode-duration {\r
  color: rgba(255, 255, 255, 0.5);\r
  font-size: 0.875rem;\r
}\r
\r
.series-selector__episode-play {\r
  padding: 0.625rem 1.25rem;\r
  border-radius: 8px;\r
  border: none;\r
  background: linear-gradient(90deg, #4f46e5, #6366f1);\r
  color: #fff;\r
  font-size: 0.95rem;\r
  font-weight: 600;\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
  white-space: nowrap;\r
}\r
\r
.series-selector__episode-play:hover {\r
  background: linear-gradient(90deg, #6366f1, #4f46e5);\r
  transform: scale(1.05);\r
}\r
/* Profile Selector */\r
.profile-selector {\r
  width: 100%;\r
  min-height: 100vh;\r
  display: flex;\r
  justify-content: center;\r
  align-items: center;\r
  padding: 3rem;\r
}\r
\r
.profile-selector__container {\r
  max-width: 1200px;\r
  width: 100%;\r
}\r
\r
.profile-selector__title {\r
  font-size: 3rem;\r
  font-weight: 400;\r
  text-align: center;\r
  margin-bottom: 0.5rem;\r
  color: #f0f4ff;\r
}\r
\r
.profile-selector__subtitle {\r
  font-size: 1.1rem;\r
  color: rgba(240, 244, 255, 0.6);\r
  text-align: center;\r
  margin-bottom: 3rem;\r
}\r
\r
.profile-selector__grid {\r
  display: grid;\r
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\r
  gap: 2rem;\r
  max-width: 900px;\r
  margin: 0 auto;\r
}\r
\r
.profile-card-container {\r
  position: relative;\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
}\r
\r
.profile-card {\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  gap: 1rem;\r
  padding: 1.5rem;\r
  background: transparent;\r
  border: 3px solid transparent;\r
  border-radius: 16px;\r
  cursor: pointer;\r
  transition: all 0.3s ease;\r
  position: relative;\r
}\r
\r
.profile-card:hover,\r
.profile-card:focus {\r
  border-color: rgba(255, 255, 255, 0.8);\r
  transform: scale(1.05);\r
  background: rgba(255, 255, 255, 0.05);\r
}\r
\r
.profile-card__avatar {\r
  width: 120px;\r
  height: 120px;\r
  border-radius: 12px;\r
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.3), rgba(99, 102, 241, 0.3));\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-size: 4rem;\r
  transition: all 0.3s ease;\r
}\r
\r
.profile-card:hover .profile-card__avatar {\r
  box-shadow: 0 8px 24px rgba(79, 70, 229, 0.4);\r
}\r
\r
.profile-card__avatar--add {\r
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));\r
  font-size: 5rem;\r
  font-weight: 300;\r
  color: rgba(255, 255, 255, 0.6);\r
}\r
\r
.profile-card__name {\r
  font-size: 1.25rem;\r
  color: rgba(255, 255, 255, 0.9);\r
  text-align: center;\r
}\r
\r
.profile-card__lock {\r
  position: absolute;\r
  top: 1rem;\r
  right: 1rem;\r
  font-size: 1.25rem;\r
}\r
\r
.profile-card--add {\r
  border: 3px dashed rgba(255, 255, 255, 0.3);\r
}\r
\r
.profile-card--add:hover {\r
  border-color: rgba(255, 255, 255, 0.6);\r
}\r
\r
.profile-card__edit {\r
  position: absolute;\r
  top: -0.5rem;\r
  right: -0.5rem;\r
  width: 32px;\r
  height: 32px;\r
  border-radius: 50%;\r
  border: none;\r
  background: rgba(79, 70, 229, 0.9);\r
  color: white;\r
  font-size: 0.875rem;\r
  cursor: pointer;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  opacity: 0;\r
  transform: scale(0.8);\r
  transition: all 0.2s ease;\r
  z-index: 10;\r
}\r
\r
.profile-card-container:hover .profile-card__edit {\r
  opacity: 1;\r
  transform: scale(1);\r
}\r
\r
.profile-card__edit:hover {\r
  background: rgba(79, 70, 229, 1);\r
  transform: scale(1.1);\r
}\r
\r
/* Modal */\r
.modal-overlay {\r
  position: fixed;\r
  inset: 0;\r
  background: rgba(0, 0, 0, 0.85);\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  z-index: 9999;\r
  backdrop-filter: blur(8px);\r
}\r
\r
.modal {\r
  background: linear-gradient(145deg, rgba(13, 19, 32, 0.95), rgba(8, 11, 18, 0.98));\r
  border-radius: 24px;\r
  padding: 2.5rem;\r
  max-width: 500px;\r
  width: 90%;\r
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
}\r
\r
.modal h2 {\r
  font-size: 1.75rem;\r
  margin-bottom: 1.5rem;\r
  color: #f0f4ff;\r
}\r
\r
.modal label {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 0.5rem;\r
  margin-bottom: 1.25rem;\r
  font-size: 0.95rem;\r
  color: rgba(240, 244, 255, 0.8);\r
}\r
\r
.modal input[type="text"],\r
.modal input[type="password"] {\r
  padding: 0.875rem 1rem;\r
  border-radius: 12px;\r
  border: 2px solid rgba(255, 255, 255, 0.1);\r
  background: rgba(18, 24, 38, 0.6);\r
  color: #f0f4ff;\r
  font-size: 1rem;\r
  transition: all 0.2s ease;\r
}\r
\r
.modal input:focus {\r
  outline: none;\r
  border-color: rgba(79, 70, 229, 0.6);\r
  background: rgba(18, 24, 38, 0.8);\r
}\r
\r
.modal__error {\r
  color: #f87171;\r
  font-size: 0.875rem;\r
  margin-top: -0.5rem;\r
  margin-bottom: 1rem;\r
}\r
\r
.modal__actions {\r
  display: flex;\r
  gap: 1rem;\r
  margin-top: 1.5rem;\r
}\r
\r
.modal__actions button {\r
  flex: 1;\r
  padding: 0.875rem 1.5rem;\r
  border-radius: 12px;\r
  border: none;\r
  font-size: 1rem;\r
  font-weight: 500;\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
}\r
\r
.modal__delete-btn {\r
  background: rgba(248, 113, 113, 0.9) !important;\r
  color: #fff !important;\r
}\r
\r
.modal__delete-btn:hover {\r
  background: rgba(248, 113, 113, 1) !important;\r
  transform: translateY(-1px);\r
  box-shadow: 0 4px 12px rgba(248, 113, 113, 0.4);\r
}\r
\r
.modal__actions button:first-child {\r
  background: rgba(255, 255, 255, 0.1);\r
  color: rgba(255, 255, 255, 0.8);\r
}\r
\r
.modal__actions button:first-child:hover {\r
  background: rgba(255, 255, 255, 0.15);\r
}\r
\r
.modal__actions button:last-child {\r
  background: linear-gradient(135deg, #4f46e5, #6366f1);\r
  color: #fff;\r
}\r
\r
.modal__actions button:last-child:hover {\r
  background: linear-gradient(135deg, #4338ca, #4f46e5);\r
  transform: translateY(-1px);\r
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);\r
}\r
\r
/* Avatar Picker */\r
.avatar-picker {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 1rem;\r
  padding: 0.5rem;\r
  background: rgba(18, 24, 38, 0.4);\r
  border-radius: 12px;\r
  max-height: 300px;\r
  overflow-y: auto;\r
}\r
\r
.avatar-category {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 0.5rem;\r
}\r
\r
.avatar-category__title {\r
  font-size: 0.85rem;\r
  font-weight: 600;\r
  color: rgba(240, 244, 255, 0.8);\r
  padding: 0 0.5rem;\r
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\r
  padding-bottom: 0.25rem;\r
}\r
\r
.avatar-category__items {\r
  display: grid;\r
  grid-template-columns: repeat(8, 1fr);\r
  gap: 0.25rem;\r
}\r
\r
.avatar-picker__item {\r
  width: 40px;\r
  height: 40px;\r
  border-radius: 8px;\r
  border: 2px solid transparent;\r
  background: rgba(255, 255, 255, 0.05);\r
  font-size: 1.25rem;\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  position: relative;\r
}\r
\r
.avatar-picker__item:hover {\r
  background: rgba(255, 255, 255, 0.1);\r
  transform: scale(1.1);\r
}\r
\r
.avatar-picker__item--active {\r
  border-color: #4f46e5;\r
  background: rgba(79, 70, 229, 0.2);\r
  transform: scale(1.1);\r
}\r
/* Botão grande para assistir */\r
.details__play.details__play--big {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 1rem 2.5rem;\r
  font-size: 1.25rem;\r
  font-weight: 600;\r
  background: linear-gradient(90deg, #4f46e5, #6366f1);\r
  color: #fff;\r
  border: none;\r
  border-radius: 12px;\r
  box-shadow: 0 2px 16px rgba(79,70,229,0.15);\r
  cursor: pointer;\r
  margin-top: 2rem;\r
  transition: background 0.2s, transform 0.2s;\r
}\r
.details__play.details__play--big:hover {\r
  background: linear-gradient(90deg, #6366f1, #4f46e5);\r
  transform: scale(1.05);\r
}\r
\r
/* Área de ações */\r
.details__actions {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 1rem;\r
  margin-top: 2rem;\r
}\r
\r
/* Botão de favoritos */\r
.details__favorite {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 0.875rem 1.5rem;\r
  font-size: 1rem;\r
  font-weight: 500;\r
  background: rgba(251, 191, 36, 0.1);\r
  color: #fbbf24;\r
  border: 1px solid rgba(251, 191, 36, 0.3);\r
  border-radius: 12px;\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
}\r
\r
.details__favorite:hover {\r
  background: rgba(251, 191, 36, 0.2);\r
  border-color: rgba(251, 191, 36, 0.5);\r
  transform: translateY(-1px);\r
}\r
:root {\r
  font-family: 'LG Smart', 'Segoe UI', sans-serif;\r
  color-scheme: dark;\r
  background-color: #080b12;\r
  color: #f0f4ff;\r
}\r
\r
* {\r
  box-sizing: border-box;\r
  margin: 0;\r
  padding: 0;\r
}\r
\r
body {\r
  background-color: #080b12;\r
  min-height: 100vh;\r
  display: flex;\r
  align-items: stretch;\r
  justify-content: center;\r
}\r
\r
#root {\r
  flex: 1;\r
  display: flex;\r
  justify-content: center;\r
}\r
\r
.loading-screen {\r
  width: 100%;\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 1.5rem;\r
  font-size: 1.2rem;\r
  color: rgba(240, 244, 255, 0.75);\r
}\r
\r
.loading-screen__spinner {\r
  width: 72px;\r
  height: 72px;\r
  border-radius: 50%;\r
  border: 6px solid rgba(240, 244, 255, 0.2);\r
  border-top-color: #11c2ff;\r
  animation: spin 1.1s linear infinite;\r
}\r
\r
.login-screen {\r
  width: 100%;\r
  max-width: 1920px;\r
  padding: 3rem;\r
  display: flex;\r
  justify-content: center;\r
}\r
\r
.login-box {\r
  background: linear-gradient(145deg, rgba(13, 19, 32, 0.9), rgba(8, 11, 18, 0.95));\r
  border-radius: 32px;\r
  padding: 3rem 4rem;\r
  width: 540px;\r
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.45);\r
  display: flex;\r
  flex-direction: column;\r
  gap: 1.5rem;\r
}\r
\r
.login-box h1 {\r
  font-size: 2.4rem;\r
  font-weight: 700;\r
  letter-spacing: 0.04em;\r
}\r
\r
.login-box form {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 1.5rem;\r
}\r
\r
.login-box label {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 0.75rem;\r
  font-size: 1rem;\r
  color: rgba(240, 244, 255, 0.8);\r
}\r
\r
.login-box input {\r
  border: none;\r
  border-radius: 16px;\r
  padding: 1rem 1.25rem;\r
  font-size: 1rem;\r
  background: rgba(18, 24, 38, 0.9);\r
  color: #f0f4ff;\r
  transition: outline 0.2s ease;\r
}\r
\r
.login-box input:focus {\r
  outline: 3px solid #4dd2ff;\r
  outline-offset: 0;\r
}\r
\r
.login-box button {\r
  padding: 1.1rem 1.5rem;\r
  border-radius: 18px;\r
  border: none;\r
  font-size: 1.1rem;\r
  font-weight: 600;\r
  background: linear-gradient(120deg, #1f6bff, #11c2ff);\r
  color: #fff;\r
  cursor: pointer;\r
  transition: transform 0.2s ease, filter 0.2s ease;\r
}\r
\r
.login-box button:disabled {\r
  filter: grayscale(0.4);\r
  cursor: progress;\r
}\r
\r
.login-box button:not(:disabled):hover {\r
  transform: translateY(-2px);\r
}\r
\r
.login-box .error {\r
  color: #ff7a7a;\r
  font-size: 0.95rem;\r
}\r
\r
.dashboard {\r
  width: 100%;\r
  max-width: 1920px;\r
  height: 100vh;\r
  padding: 3rem 4rem;\r
  display: grid;\r
  grid-template-rows: auto 1fr;\r
  gap: 2rem;\r
}\r
\r
.dashboard__header {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
}\r
\r
.dashboard__title-group {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 0.35rem;\r
}\r
\r
.dashboard__subtitle-group {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 0.25rem;\r
}\r
\r
.dashboard__profile {\r
  font-size: 0.95rem;\r
  color: rgba(240, 244, 255, 0.8);\r
  font-weight: 500;\r
}\r
\r
.dashboard__subtitle {\r
  font-size: 1rem;\r
  color: rgba(240, 244, 255, 0.55);\r
}\r
\r
.dashboard__header h2 {\r
  font-size: 2.4rem;\r
  font-weight: 700;\r
}\r
\r
.dashboard__tabs {\r
  display: flex;\r
  gap: 1rem;\r
}\r
\r
.dashboard__error {\r
  margin-bottom: 1rem;\r
  padding: 1rem 1.5rem;\r
  border-radius: 16px;\r
  background: rgba(255, 94, 108, 0.12);\r
  color: #ffb6c4;\r
  font-size: 0.95rem;\r
}\r
\r
.dashboard__search-btn {\r
  margin-left: auto;\r
  margin-right: 1rem;\r
  padding: 0.75rem 1.75rem;\r
  border-radius: 999px;\r
  border: 1px solid rgba(99, 102, 241, 0.3);\r
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(99, 102, 241, 0.2));\r
  color: rgba(255, 255, 255, 0.9);\r
  font-size: 1rem;\r
  font-weight: 600;\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
}\r
\r
.dashboard__search-btn:hover,\r
.dashboard__search-btn:focus-visible {\r
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.3), rgba(99, 102, 241, 0.3));\r
  border-color: rgba(99, 102, 241, 0.5);\r
  transform: translateY(-1px);\r
  outline: none;\r
}\r
\r
.dashboard__favorites-btn {\r
  margin-left: 1rem;\r
  padding: 0.75rem 1.75rem;\r
  border-radius: 999px;\r
  border: 1px solid rgba(251, 191, 36, 0.3);\r
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2));\r
  color: rgba(255, 255, 255, 0.9);\r
  font-size: 1rem;\r
  font-weight: 600;\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
}\r
\r
.dashboard__favorites-btn:hover,\r
.dashboard__favorites-btn:focus-visible {\r
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(245, 158, 11, 0.3));\r
  border-color: rgba(251, 191, 36, 0.5);\r
  transform: translateY(-1px);\r
  outline: none;\r
}\r
\r
.dashboard__profile-btn {\r
  margin-left: 1rem;\r
  padding: 0.75rem 1.75rem;\r
  border-radius: 999px;\r
  border: 1px solid rgba(34, 197, 94, 0.3);\r
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2));\r
  color: rgba(255, 255, 255, 0.9);\r
  font-size: 1rem;\r
  font-weight: 600;\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
}\r
\r
.dashboard__profile-btn:hover,\r
.dashboard__profile-btn:focus-visible {\r
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(59, 130, 246, 0.3));\r
  border-color: rgba(34, 197, 94, 0.5);\r
  transform: translateY(-1px);\r
  outline: none;\r
}\r
\r
.dashboard__management {\r
  margin-left: 1rem;\r
  padding: 0.75rem 1.75rem;\r
  border-radius: 999px;\r
  border: 1px solid rgba(255, 152, 0, 0.3);\r
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.2), rgba(245, 158, 11, 0.2));\r
  color: rgba(255, 255, 255, 0.9);\r
  font-size: 1rem;\r
  font-weight: 600;\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
}\r
\r
.dashboard__management:hover,\r
.dashboard__management:focus-visible {\r
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.3), rgba(245, 158, 11, 0.3));\r
  border-color: rgba(255, 152, 0, 0.5);\r
  transform: translateY(-1px);\r
  outline: none;\r
}\r
\r
.dashboard__logout {\r
  margin-left: 1.5rem;\r
  padding: 0.75rem 1.75rem;\r
  border-radius: 999px;\r
  border: 1px solid rgba(255, 255, 255, 0.15);\r
  background: rgba(12, 18, 30, 0.4);\r
  color: rgba(240, 244, 255, 0.85);\r
  font-size: 1rem;\r
  font-weight: 600;\r
  cursor: pointer;\r
  transition: background 0.2s ease, color 0.2s ease;\r
}\r
\r
.dashboard__logout:hover,\r
.dashboard__logout:focus-visible {\r
  background: rgba(255, 78, 108, 0.25);\r
  color: #ffb6c4;\r
  outline: none;\r
}\r
\r
.tab {\r
  padding: 0.75rem 2.5rem;\r
  border-radius: 999px;\r
  border: 1px solid rgba(255, 255, 255, 0.12);\r
  background: rgba(12, 18, 30, 0.6);\r
  color: rgba(240, 244, 255, 0.85);\r
  font-size: 1rem;\r
  font-weight: 600;\r
  cursor: pointer;\r
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;\r
}\r
\r
.tab[data-focused='true'],\r
.tab:focus-visible {\r
  outline: 3px solid #4dd2ff;\r
  outline-offset: 2px;\r
}\r
\r
.tab--active {\r
  background: linear-gradient(120deg, #1f6bff, #11c2ff);\r
  color: #fff;\r
  border-color: transparent;\r
}\r
\r
.dashboard__content {\r
  display: grid;\r
  grid-template-columns: 320px 1fr 360px;\r
  gap: 2rem;\r
  height: 100%;\r
}\r
\r
.categories {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 0.75rem;\r
  overflow-y: auto;\r
  padding-right: 0.5rem;\r
}\r
\r
.categories[data-focused='true'] .category--active {\r
  outline: 3px solid #4dd2ff;\r
}\r
\r
.category {\r
  padding: 1rem 1.25rem;\r
  border-radius: 16px;\r
  background: rgba(15, 20, 32, 0.75);\r
  color: rgba(240, 244, 255, 0.8);\r
  border: none;\r
  text-align: left;\r
  font-size: 1rem;\r
  cursor: pointer;\r
  transition: background 0.2s ease, color 0.2s ease;\r
}\r
\r
.category--active {\r
  background: linear-gradient(120deg, rgba(31, 107, 255, 0.35), rgba(17, 194, 255, 0.35));\r
  color: #fff;\r
}\r
\r
.category--skeleton {\r
  width: 100%;\r
  height: 3.25rem;\r
  border-radius: 16px;\r
  background: linear-gradient(90deg, rgba(18, 24, 38, 0.5), rgba(18, 24, 38, 0.8), rgba(18, 24, 38, 0.5));\r
  background-size: 200% 100%;\r
  animation: shimmer 1.2s infinite;\r
}\r
\r
.grid {\r
  display: grid;\r
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\r
  grid-auto-rows: 320px;\r
  gap: 1.5rem;\r
  overflow: hidden;\r
  position: relative;\r
}\r
\r
.grid[data-focused='true'] .card--focused {\r
  outline: 4px solid #4dd2ff;\r
  outline-offset: 4px;\r
}\r
\r
.grid--loading {\r
  opacity: 0.75;\r
}\r
\r
.grid__empty {\r
  grid-column: 1 / -1;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-size: 1.2rem;\r
  color: rgba(240, 244, 255, 0.6);\r
}\r
\r
.card {\r
  background: rgba(15, 20, 32, 0.8);\r
  border-radius: 24px;\r
  overflow: hidden;\r
  display: flex;\r
  flex-direction: column;\r
  position: relative;\r
  transition: transform 0.2s ease, box-shadow 0.2s ease;\r
}\r
\r
.card--focused {\r
  transform: scale(1.02);\r
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35);\r
}\r
\r
.card--skeleton {\r
  border-radius: 24px;\r
  background: linear-gradient(90deg, rgba(18, 24, 38, 0.3), rgba(18, 24, 38, 0.6), rgba(18, 24, 38, 0.3));\r
  background-size: 200% 100%;\r
  animation: shimmer 1.2s infinite;\r
}\r
\r
.card__poster {\r
  flex: 1;\r
  background: rgba(12, 18, 30, 0.8);\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
.card__poster img {\r
  width: 100%;\r
  height: 100%;\r
  object-fit: cover;\r
}\r
\r
.card__poster--placeholder {\r
  font-size: 3rem;\r
  font-weight: 700;\r
  color: rgba(240, 244, 255, 0.3);\r
}\r
\r
.card__meta {\r
  padding: 1.25rem;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 0.5rem;\r
}\r
\r
.card__title {\r
  font-size: 1.1rem;\r
  font-weight: 600;\r
  color: #fff;\r
}\r
\r
.card__info {\r
  font-size: 0.9rem;\r
  color: rgba(240, 244, 255, 0.6);\r
}\r
\r
.details {\r
  background: rgba(15, 20, 32, 0.85);\r
  border-radius: 24px;\r
  padding: 2rem;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 1.25rem;\r
}\r
\r
.details__poster {\r
  width: 100%;\r
  aspect-ratio: 2 / 3;\r
  border-radius: 20px;\r
  overflow: hidden;\r
  background: rgba(12, 18, 30, 0.8);\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
.details__poster img {\r
  width: 100%;\r
  height: 100%;\r
  object-fit: cover;\r
}\r
\r
.details__poster--placeholder {\r
  font-size: 3rem;\r
  font-weight: 700;\r
  color: rgba(240, 244, 255, 0.25);\r
}\r
\r
.details__info {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 0.75rem;\r
}\r
\r
.details__rating,\r
.details__meta,\r
.details__type {\r
  font-size: 0.95rem;\r
  color: rgba(240, 244, 255, 0.65);\r
}\r
\r
.details__line {\r
  height: 14px;\r
  border-radius: 8px;\r
  background: rgba(18, 24, 38, 0.7);\r
}\r
\r
.details__line--primary {\r
  height: 18px;\r
  width: 80%;\r
}\r
\r
.details__poster--skeleton {\r
  border-radius: 20px;\r
  background: linear-gradient(90deg, rgba(18, 24, 38, 0.3), rgba(18, 24, 38, 0.6), rgba(18, 24, 38, 0.3));\r
  background-size: 200% 100%;\r
  animation: shimmer 1.2s infinite;\r
}\r
\r
.details--loading .details__info {\r
  gap: 1rem;\r
}\r
\r
@keyframes shimmer {\r
  0% {\r
    background-position: 200% 0;\r
  }\r
\r
  100% {\r
    background-position: -200% 0;\r
  }\r
}\r
\r
@keyframes spin {\r
  0% {\r
    transform: rotate(0deg);\r
  }\r
\r
  100% {\r
    transform: rotate(360deg);\r
  }\r
}\r
\r
@media (max-width: 1280px) {\r
  .dashboard__content {\r
    grid-template-columns: 280px 1fr 320px;\r
  }\r
}\r
\r
@media (max-width: 1024px) {\r
  body {\r
    justify-content: flex-start;\r
  }\r
\r
  .dashboard {\r
    padding: 2rem;\r
  }\r
\r
  .dashboard__content {\r
    grid-template-columns: 240px 1fr;\r
    grid-template-rows: auto auto;\r
    gap: 1.5rem;\r
  }\r
\r
  .details {\r
    grid-column: 1 / -1;\r
    flex-direction: row;\r
  }\r
}\r
/*$vite$:1*/`;
  document.head.appendChild(__vite_style__);
  var _documentCurrentScript = typeof document !== "undefined" ? document.currentScript : null;
  function getDefaultExportFromCjs(x2) {
    return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
  }
  var jsxRuntime = { exports: {} };
  var reactJsxRuntime_production_min = {};
  var react = { exports: {} };
  var react_production_min = {};
  /**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var l$1 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$2 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
  function A$1(a) {
    if (null === a || "object" !== typeof a) return null;
    a = z$1 && a[z$1] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }
  var B$1 = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, C$1 = Object.assign, D$1 = {};
  function E$1(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = D$1;
    this.updater = e || B$1;
  }
  E$1.prototype.isReactComponent = {};
  E$1.prototype.setState = function(a, b) {
    if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, a, b, "setState");
  };
  E$1.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
  };
  function F() {
  }
  F.prototype = E$1.prototype;
  function G$1(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = D$1;
    this.updater = e || B$1;
  }
  var H$1 = G$1.prototype = new F();
  H$1.constructor = G$1;
  C$1(H$1, E$1.prototype);
  H$1.isPureReactComponent = true;
  var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
  function M$1(a, b, e) {
    var d, c = {}, k2 = null, h = null;
    if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k2 = "" + b.key), b) J.call(b, d) && !L$1.hasOwnProperty(d) && (c[d] = b[d]);
    var g = arguments.length - 2;
    if (1 === g) c.children = e;
    else if (1 < g) {
      for (var f2 = Array(g), m2 = 0; m2 < g; m2++) f2[m2] = arguments[m2 + 2];
      c.children = f2;
    }
    if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
    return { $$typeof: l$1, type: a, key: k2, ref: h, props: c, _owner: K$1.current };
  }
  function N$1(a, b) {
    return { $$typeof: l$1, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
  }
  function O$1(a) {
    return "object" === typeof a && null !== a && a.$$typeof === l$1;
  }
  function escape(a) {
    var b = { "=": "=0", ":": "=2" };
    return "$" + a.replace(/[=:]/g, function(a2) {
      return b[a2];
    });
  }
  var P$1 = /\/+/g;
  function Q$1(a, b) {
    return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
  }
  function R$1(a, b, e, d, c) {
    var k2 = typeof a;
    if ("undefined" === k2 || "boolean" === k2) a = null;
    var h = false;
    if (null === a) h = true;
    else switch (k2) {
      case "string":
      case "number":
        h = true;
        break;
      case "object":
        switch (a.$$typeof) {
          case l$1:
          case n$1:
            h = true;
        }
    }
    if (h) return h = a, c = c(h), a = "" === d ? "." + Q$1(h, 0) : d, I$1(c) ? (e = "", null != a && (e = a.replace(P$1, "$&/") + "/"), R$1(c, b, e, "", function(a2) {
      return a2;
    })) : null != c && (O$1(c) && (c = N$1(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P$1, "$&/") + "/") + a)), b.push(c)), 1;
    h = 0;
    d = "" === d ? "." : d + ":";
    if (I$1(a)) for (var g = 0; g < a.length; g++) {
      k2 = a[g];
      var f2 = d + Q$1(k2, g);
      h += R$1(k2, b, e, f2, c);
    }
    else if (f2 = A$1(a), "function" === typeof f2) for (a = f2.call(a), g = 0; !(k2 = a.next()).done; ) k2 = k2.value, f2 = d + Q$1(k2, g++), h += R$1(k2, b, e, f2, c);
    else if ("object" === k2) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
    return h;
  }
  function S$1(a, b, e) {
    if (null == a) return a;
    var d = [], c = 0;
    R$1(a, d, "", "", function(a2) {
      return b.call(e, a2, c++);
    });
    return d;
  }
  function T$1(a) {
    if (-1 === a._status) {
      var b = a._result;
      b = b();
      b.then(function(b2) {
        if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
      }, function(b2) {
        if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
      });
      -1 === a._status && (a._status = 0, a._result = b);
    }
    if (1 === a._status) return a._result.default;
    throw a._result;
  }
  var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
  function X$1() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  react_production_min.Children = { map: S$1, forEach: function(a, b, e) {
    S$1(a, function() {
      b.apply(this, arguments);
    }, e);
  }, count: function(a) {
    var b = 0;
    S$1(a, function() {
      b++;
    });
    return b;
  }, toArray: function(a) {
    return S$1(a, function(a2) {
      return a2;
    }) || [];
  }, only: function(a) {
    if (!O$1(a)) throw Error("React.Children.only expected to receive a single React element child.");
    return a;
  } };
  react_production_min.Component = E$1;
  react_production_min.Fragment = p$2;
  react_production_min.Profiler = r;
  react_production_min.PureComponent = G$1;
  react_production_min.StrictMode = q$1;
  react_production_min.Suspense = w;
  react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
  react_production_min.act = X$1;
  react_production_min.cloneElement = function(a, b, e) {
    if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
    var d = C$1({}, a.props), c = a.key, k2 = a.ref, h = a._owner;
    if (null != b) {
      void 0 !== b.ref && (k2 = b.ref, h = K$1.current);
      void 0 !== b.key && (c = "" + b.key);
      if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
      for (f2 in b) J.call(b, f2) && !L$1.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
    }
    var f2 = arguments.length - 2;
    if (1 === f2) d.children = e;
    else if (1 < f2) {
      g = Array(f2);
      for (var m2 = 0; m2 < f2; m2++) g[m2] = arguments[m2 + 2];
      d.children = g;
    }
    return { $$typeof: l$1, type: a.type, key: c, ref: k2, props: d, _owner: h };
  };
  react_production_min.createContext = function(a) {
    a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
    a.Provider = { $$typeof: t, _context: a };
    return a.Consumer = a;
  };
  react_production_min.createElement = M$1;
  react_production_min.createFactory = function(a) {
    var b = M$1.bind(null, a);
    b.type = a;
    return b;
  };
  react_production_min.createRef = function() {
    return { current: null };
  };
  react_production_min.forwardRef = function(a) {
    return { $$typeof: v$1, render: a };
  };
  react_production_min.isValidElement = O$1;
  react_production_min.lazy = function(a) {
    return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$1 };
  };
  react_production_min.memo = function(a, b) {
    return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
  };
  react_production_min.startTransition = function(a) {
    var b = V$1.transition;
    V$1.transition = {};
    try {
      a();
    } finally {
      V$1.transition = b;
    }
  };
  react_production_min.unstable_act = X$1;
  react_production_min.useCallback = function(a, b) {
    return U$1.current.useCallback(a, b);
  };
  react_production_min.useContext = function(a) {
    return U$1.current.useContext(a);
  };
  react_production_min.useDebugValue = function() {
  };
  react_production_min.useDeferredValue = function(a) {
    return U$1.current.useDeferredValue(a);
  };
  react_production_min.useEffect = function(a, b) {
    return U$1.current.useEffect(a, b);
  };
  react_production_min.useId = function() {
    return U$1.current.useId();
  };
  react_production_min.useImperativeHandle = function(a, b, e) {
    return U$1.current.useImperativeHandle(a, b, e);
  };
  react_production_min.useInsertionEffect = function(a, b) {
    return U$1.current.useInsertionEffect(a, b);
  };
  react_production_min.useLayoutEffect = function(a, b) {
    return U$1.current.useLayoutEffect(a, b);
  };
  react_production_min.useMemo = function(a, b) {
    return U$1.current.useMemo(a, b);
  };
  react_production_min.useReducer = function(a, b, e) {
    return U$1.current.useReducer(a, b, e);
  };
  react_production_min.useRef = function(a) {
    return U$1.current.useRef(a);
  };
  react_production_min.useState = function(a) {
    return U$1.current.useState(a);
  };
  react_production_min.useSyncExternalStore = function(a, b, e) {
    return U$1.current.useSyncExternalStore(a, b, e);
  };
  react_production_min.useTransition = function() {
    return U$1.current.useTransition();
  };
  react_production_min.version = "18.3.1";
  {
    react.exports = react_production_min;
  }
  var reactExports = react.exports;
  const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, g) {
    var b, d = {}, e = null, h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a) m$1.call(a, b) && !p$1.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
    return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  {
    jsxRuntime.exports = reactJsxRuntime_production_min;
  }
  var jsxRuntimeExports = jsxRuntime.exports;
  var client = {};
  var reactDom = { exports: {} };
  var reactDom_production_min = {};
  var scheduler = { exports: {} };
  var scheduler_production_min = {};
  /**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  (function(exports) {
    function f2(a, b) {
      var c = a.length;
      a.push(b);
      a: for (; 0 < c; ) {
        var d = c - 1 >>> 1, e = a[d];
        if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
        else break a;
      }
    }
    function h(a) {
      return 0 === a.length ? null : a[0];
    }
    function k2(a) {
      if (0 === a.length) return null;
      var b = a[0], c = a.pop();
      if (c !== b) {
        a[0] = c;
        a: for (var d = 0, e = a.length, w2 = e >>> 1; d < w2; ) {
          var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
          if (0 > g(C2, c)) n2 < e && 0 > g(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
          else if (n2 < e && 0 > g(x2, c)) a[d] = x2, a[n2] = c, d = n2;
          else break a;
        }
      }
      return b;
    }
    function g(a, b) {
      var c = a.sortIndex - b.sortIndex;
      return 0 !== c ? c : a.id - b.id;
    }
    if ("object" === typeof performance && "function" === typeof performance.now) {
      var l2 = performance;
      exports.unstable_now = function() {
        return l2.now();
      };
    } else {
      var p2 = Date, q2 = p2.now();
      exports.unstable_now = function() {
        return p2.now() - q2;
      };
    }
    var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
    "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function G2(a) {
      for (var b = h(t2); null !== b; ) {
        if (null === b.callback) k2(t2);
        else if (b.startTime <= a) k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
        else break;
        b = h(t2);
      }
    }
    function H2(a) {
      B2 = false;
      G2(a);
      if (!A2) if (null !== h(r2)) A2 = true, I2(J2);
      else {
        var b = h(t2);
        null !== b && K2(H2, b.startTime - a);
      }
    }
    function J2(a, b) {
      A2 = false;
      B2 && (B2 = false, E2(L2), L2 = -1);
      z2 = true;
      var c = y2;
      try {
        G2(b);
        for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a && !M2()); ) {
          var d = v2.callback;
          if ("function" === typeof d) {
            v2.callback = null;
            y2 = v2.priorityLevel;
            var e = d(v2.expirationTime <= b);
            b = exports.unstable_now();
            "function" === typeof e ? v2.callback = e : v2 === h(r2) && k2(r2);
            G2(b);
          } else k2(r2);
          v2 = h(r2);
        }
        if (null !== v2) var w2 = true;
        else {
          var m2 = h(t2);
          null !== m2 && K2(H2, m2.startTime - b);
          w2 = false;
        }
        return w2;
      } finally {
        v2 = null, y2 = c, z2 = false;
      }
    }
    var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
    function M2() {
      return exports.unstable_now() - Q2 < P2 ? false : true;
    }
    function R2() {
      if (null !== O2) {
        var a = exports.unstable_now();
        Q2 = a;
        var b = true;
        try {
          b = O2(true, a);
        } finally {
          b ? S2() : (N2 = false, O2 = null);
        }
      } else N2 = false;
    }
    var S2;
    if ("function" === typeof F2) S2 = function() {
      F2(R2);
    };
    else if ("undefined" !== typeof MessageChannel) {
      var T2 = new MessageChannel(), U2 = T2.port2;
      T2.port1.onmessage = R2;
      S2 = function() {
        U2.postMessage(null);
      };
    } else S2 = function() {
      D2(R2, 0);
    };
    function I2(a) {
      O2 = a;
      N2 || (N2 = true, S2());
    }
    function K2(a, b) {
      L2 = D2(function() {
        a(exports.unstable_now());
      }, b);
    }
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(a) {
      a.callback = null;
    };
    exports.unstable_continueExecution = function() {
      A2 || z2 || (A2 = true, I2(J2));
    };
    exports.unstable_forceFrameRate = function(a) {
      0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return y2;
    };
    exports.unstable_getFirstCallbackNode = function() {
      return h(r2);
    };
    exports.unstable_next = function(a) {
      switch (y2) {
        case 1:
        case 2:
        case 3:
          var b = 3;
          break;
        default:
          b = y2;
      }
      var c = y2;
      y2 = b;
      try {
        return a();
      } finally {
        y2 = c;
      }
    };
    exports.unstable_pauseExecution = function() {
    };
    exports.unstable_requestPaint = function() {
    };
    exports.unstable_runWithPriority = function(a, b) {
      switch (a) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a = 3;
      }
      var c = y2;
      y2 = a;
      try {
        return b();
      } finally {
        y2 = c;
      }
    };
    exports.unstable_scheduleCallback = function(a, b, c) {
      var d = exports.unstable_now();
      "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
      switch (a) {
        case 1:
          var e = -1;
          break;
        case 2:
          e = 250;
          break;
        case 5:
          e = 1073741823;
          break;
        case 4:
          e = 1e4;
          break;
        default:
          e = 5e3;
      }
      e = c + e;
      a = { id: u2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
      c > d ? (a.sortIndex = c, f2(t2, a), null === h(r2) && a === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
      return a;
    };
    exports.unstable_shouldYield = M2;
    exports.unstable_wrapCallback = function(a) {
      var b = y2;
      return function() {
        var c = y2;
        y2 = b;
        try {
          return a.apply(this, arguments);
        } finally {
          y2 = c;
        }
      };
    };
  })(scheduler_production_min);
  {
    scheduler.exports = scheduler_production_min;
  }
  var schedulerExports = scheduler.exports;
  /**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var aa = reactExports, ca = schedulerExports;
  function p(a) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var da = /* @__PURE__ */ new Set(), ea = {};
  function fa(a, b) {
    ha(a, b);
    ha(a + "Capture", b);
  }
  function ha(a, b) {
    ea[a] = b;
    for (a = 0; a < b.length; a++) da.add(b[a]);
  }
  var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
  function oa(a) {
    if (ja.call(ma, a)) return true;
    if (ja.call(la, a)) return false;
    if (ka.test(a)) return ma[a] = true;
    la[a] = true;
    return false;
  }
  function pa(a, b, c, d) {
    if (null !== c && 0 === c.type) return false;
    switch (typeof b) {
      case "function":
      case "symbol":
        return true;
      case "boolean":
        if (d) return false;
        if (null !== c) return !c.acceptsBooleans;
        a = a.toLowerCase().slice(0, 5);
        return "data-" !== a && "aria-" !== a;
      default:
        return false;
    }
  }
  function qa(a, b, c, d) {
    if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
    if (d) return false;
    if (null !== c) switch (c.type) {
      case 3:
        return !b;
      case 4:
        return false === b;
      case 5:
        return isNaN(b);
      case 6:
        return isNaN(b) || 1 > b;
    }
    return false;
  }
  function v(a, b, c, d, e, f2, g) {
    this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
    this.attributeName = d;
    this.attributeNamespace = e;
    this.mustUseProperty = c;
    this.propertyName = a;
    this.type = b;
    this.sanitizeURL = f2;
    this.removeEmptyString = g;
  }
  var z = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
    z[a] = new v(a, 0, false, a, null, false, false);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
    var b = a[0];
    z[b] = new v(b, 1, false, a[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
    z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
    z[a] = new v(a, 2, false, a, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
    z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(a) {
    z[a] = new v(a, 3, true, a, null, false, false);
  });
  ["capture", "download"].forEach(function(a) {
    z[a] = new v(a, 4, false, a, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function(a) {
    z[a] = new v(a, 6, false, a, null, false, false);
  });
  ["rowSpan", "start"].forEach(function(a) {
    z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
  });
  var ra = /[\-:]([a-z])/g;
  function sa(a) {
    return a[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
    var b = a.replace(
      ra,
      sa
    );
    z[b] = new v(b, 1, false, a, null, false, false);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
    var b = a.replace(ra, sa);
    z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
    var b = a.replace(ra, sa);
    z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
  });
  ["tabIndex", "crossOrigin"].forEach(function(a) {
    z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
  });
  z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
  ["src", "href", "action", "formAction"].forEach(function(a) {
    z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
  });
  function ta(a, b, c, d) {
    var e = z.hasOwnProperty(b) ? z[b] : null;
    if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
  }
  var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
  var Ia = Symbol.for("react.offscreen");
  var Ja = Symbol.iterator;
  function Ka(a) {
    if (null === a || "object" !== typeof a) return null;
    a = Ja && a[Ja] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }
  var A = Object.assign, La;
  function Ma(a) {
    if (void 0 === La) try {
      throw Error();
    } catch (c) {
      var b = c.stack.trim().match(/\n( *(at )?)/);
      La = b && b[1] || "";
    }
    return "\n" + La + a;
  }
  var Na = false;
  function Oa(a, b) {
    if (!a || Na) return "";
    Na = true;
    var c = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (b) if (b = function() {
        throw Error();
      }, Object.defineProperty(b.prototype, "props", { set: function() {
        throw Error();
      } }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b, []);
        } catch (l2) {
          var d = l2;
        }
        Reflect.construct(a, [], b);
      } else {
        try {
          b.call();
        } catch (l2) {
          d = l2;
        }
        a.call(b.prototype);
      }
      else {
        try {
          throw Error();
        } catch (l2) {
          d = l2;
        }
        a();
      }
    } catch (l2) {
      if (l2 && d && "string" === typeof l2.stack) {
        for (var e = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e[g] !== f2[h]; ) h--;
        for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f2[h]) {
          if (1 !== g || 1 !== h) {
            do
              if (g--, h--, 0 > h || e[g] !== f2[h]) {
                var k2 = "\n" + e[g].replace(" at new ", " at ");
                a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
                return k2;
              }
            while (1 <= g && 0 <= h);
          }
          break;
        }
      }
    } finally {
      Na = false, Error.prepareStackTrace = c;
    }
    return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
  }
  function Pa(a) {
    switch (a.tag) {
      case 5:
        return Ma(a.type);
      case 16:
        return Ma("Lazy");
      case 13:
        return Ma("Suspense");
      case 19:
        return Ma("SuspenseList");
      case 0:
      case 2:
      case 15:
        return a = Oa(a.type, false), a;
      case 11:
        return a = Oa(a.type.render, false), a;
      case 1:
        return a = Oa(a.type, true), a;
      default:
        return "";
    }
  }
  function Qa(a) {
    if (null == a) return null;
    if ("function" === typeof a) return a.displayName || a.name || null;
    if ("string" === typeof a) return a;
    switch (a) {
      case ya:
        return "Fragment";
      case wa:
        return "Portal";
      case Aa:
        return "Profiler";
      case za:
        return "StrictMode";
      case Ea:
        return "Suspense";
      case Fa:
        return "SuspenseList";
    }
    if ("object" === typeof a) switch (a.$$typeof) {
      case Ca:
        return (a.displayName || "Context") + ".Consumer";
      case Ba:
        return (a._context.displayName || "Context") + ".Provider";
      case Da:
        var b = a.render;
        a = a.displayName;
        a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
        return a;
      case Ga:
        return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
      case Ha:
        b = a._payload;
        a = a._init;
        try {
          return Qa(a(b));
        } catch (c) {
        }
    }
    return null;
  }
  function Ra(a) {
    var b = a.type;
    switch (a.tag) {
      case 24:
        return "Cache";
      case 9:
        return (b.displayName || "Context") + ".Consumer";
      case 10:
        return (b._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return b;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Qa(b);
      case 8:
        return b === za ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if ("function" === typeof b) return b.displayName || b.name || null;
        if ("string" === typeof b) return b;
    }
    return null;
  }
  function Sa(a) {
    switch (typeof a) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return a;
      case "object":
        return a;
      default:
        return "";
    }
  }
  function Ta(a) {
    var b = a.type;
    return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
  }
  function Ua(a) {
    var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
    if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
      var e = c.get, f2 = c.set;
      Object.defineProperty(a, b, { configurable: true, get: function() {
        return e.call(this);
      }, set: function(a2) {
        d = "" + a2;
        f2.call(this, a2);
      } });
      Object.defineProperty(a, b, { enumerable: c.enumerable });
      return { getValue: function() {
        return d;
      }, setValue: function(a2) {
        d = "" + a2;
      }, stopTracking: function() {
        a._valueTracker = null;
        delete a[b];
      } };
    }
  }
  function Va(a) {
    a._valueTracker || (a._valueTracker = Ua(a));
  }
  function Wa(a) {
    if (!a) return false;
    var b = a._valueTracker;
    if (!b) return true;
    var c = b.getValue();
    var d = "";
    a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
    a = d;
    return a !== c ? (b.setValue(a), true) : false;
  }
  function Xa(a) {
    a = a || ("undefined" !== typeof document ? document : void 0);
    if ("undefined" === typeof a) return null;
    try {
      return a.activeElement || a.body;
    } catch (b) {
      return a.body;
    }
  }
  function Ya(a, b) {
    var c = b.checked;
    return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
  }
  function Za(a, b) {
    var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
    c = Sa(null != b.value ? b.value : c);
    a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
  }
  function ab(a, b) {
    b = b.checked;
    null != b && ta(a, "checked", b, false);
  }
  function bb(a, b) {
    ab(a, b);
    var c = Sa(b.value), d = b.type;
    if (null != c) if ("number" === d) {
      if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
    } else a.value !== "" + c && (a.value = "" + c);
    else if ("submit" === d || "reset" === d) {
      a.removeAttribute("value");
      return;
    }
    b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
    null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
  }
  function db(a, b, c) {
    if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
      var d = b.type;
      if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
      b = "" + a._wrapperState.initialValue;
      c || b === a.value || (a.value = b);
      a.defaultValue = b;
    }
    c = a.name;
    "" !== c && (a.name = "");
    a.defaultChecked = !!a._wrapperState.initialChecked;
    "" !== c && (a.name = c);
  }
  function cb(a, b, c) {
    if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
  }
  var eb = Array.isArray;
  function fb(a, b, c, d) {
    a = a.options;
    if (b) {
      b = {};
      for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
      for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
    } else {
      c = "" + Sa(c);
      b = null;
      for (e = 0; e < a.length; e++) {
        if (a[e].value === c) {
          a[e].selected = true;
          d && (a[e].defaultSelected = true);
          return;
        }
        null !== b || a[e].disabled || (b = a[e]);
      }
      null !== b && (b.selected = true);
    }
  }
  function gb(a, b) {
    if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
    return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
  }
  function hb(a, b) {
    var c = b.value;
    if (null == c) {
      c = b.children;
      b = b.defaultValue;
      if (null != c) {
        if (null != b) throw Error(p(92));
        if (eb(c)) {
          if (1 < c.length) throw Error(p(93));
          c = c[0];
        }
        b = c;
      }
      null == b && (b = "");
      c = b;
    }
    a._wrapperState = { initialValue: Sa(c) };
  }
  function ib(a, b) {
    var c = Sa(b.value), d = Sa(b.defaultValue);
    null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
    null != d && (a.defaultValue = "" + d);
  }
  function jb(a) {
    var b = a.textContent;
    b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
  }
  function kb(a) {
    switch (a) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function lb(a, b) {
    return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
  }
  var mb, nb = function(a) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
      MSApp.execUnsafeLocalFunction(function() {
        return a(b, c, d, e);
      });
    } : a;
  }(function(a, b) {
    if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
    else {
      mb = mb || document.createElement("div");
      mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
      for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
      for (; b.firstChild; ) a.appendChild(b.firstChild);
    }
  });
  function ob(a, b) {
    if (b) {
      var c = a.firstChild;
      if (c && c === a.lastChild && 3 === c.nodeType) {
        c.nodeValue = b;
        return;
      }
    }
    a.textContent = b;
  }
  var pb = {
    animationIterationCount: true,
    aspectRatio: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridArea: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
  }, qb = ["Webkit", "ms", "Moz", "O"];
  Object.keys(pb).forEach(function(a) {
    qb.forEach(function(b) {
      b = b + a.charAt(0).toUpperCase() + a.substring(1);
      pb[b] = pb[a];
    });
  });
  function rb(a, b, c) {
    return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
  }
  function sb(a, b) {
    a = a.style;
    for (var c in b) if (b.hasOwnProperty(c)) {
      var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
      "float" === c && (c = "cssFloat");
      d ? a.setProperty(c, e) : a[c] = e;
    }
  }
  var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
  function ub(a, b) {
    if (b) {
      if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
      if (null != b.dangerouslySetInnerHTML) {
        if (null != b.children) throw Error(p(60));
        if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
      }
      if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
    }
  }
  function vb(a, b) {
    if (-1 === a.indexOf("-")) return "string" === typeof b.is;
    switch (a) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var wb = null;
  function xb(a) {
    a = a.target || a.srcElement || window;
    a.correspondingUseElement && (a = a.correspondingUseElement);
    return 3 === a.nodeType ? a.parentNode : a;
  }
  var yb = null, zb = null, Ab = null;
  function Bb(a) {
    if (a = Cb(a)) {
      if ("function" !== typeof yb) throw Error(p(280));
      var b = a.stateNode;
      b && (b = Db(b), yb(a.stateNode, a.type, b));
    }
  }
  function Eb(a) {
    zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
  }
  function Fb() {
    if (zb) {
      var a = zb, b = Ab;
      Ab = zb = null;
      Bb(a);
      if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
    }
  }
  function Gb(a, b) {
    return a(b);
  }
  function Hb() {
  }
  var Ib = false;
  function Jb(a, b, c) {
    if (Ib) return a(b, c);
    Ib = true;
    try {
      return Gb(a, b, c);
    } finally {
      if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
    }
  }
  function Kb(a, b) {
    var c = a.stateNode;
    if (null === c) return null;
    var d = Db(c);
    if (null === d) return null;
    c = d[b];
    a: switch (b) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
        a = !d;
        break a;
      default:
        a = false;
    }
    if (a) return null;
    if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
    return c;
  }
  var Lb = false;
  if (ia) try {
    var Mb = {};
    Object.defineProperty(Mb, "passive", { get: function() {
      Lb = true;
    } });
    window.addEventListener("test", Mb, Mb);
    window.removeEventListener("test", Mb, Mb);
  } catch (a) {
    Lb = false;
  }
  function Nb(a, b, c, d, e, f2, g, h, k2) {
    var l2 = Array.prototype.slice.call(arguments, 3);
    try {
      b.apply(c, l2);
    } catch (m2) {
      this.onError(m2);
    }
  }
  var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
    Ob = true;
    Pb = a;
  } };
  function Tb(a, b, c, d, e, f2, g, h, k2) {
    Ob = false;
    Pb = null;
    Nb.apply(Sb, arguments);
  }
  function Ub(a, b, c, d, e, f2, g, h, k2) {
    Tb.apply(this, arguments);
    if (Ob) {
      if (Ob) {
        var l2 = Pb;
        Ob = false;
        Pb = null;
      } else throw Error(p(198));
      Qb || (Qb = true, Rb = l2);
    }
  }
  function Vb(a) {
    var b = a, c = a;
    if (a.alternate) for (; b.return; ) b = b.return;
    else {
      a = b;
      do
        b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
      while (a);
    }
    return 3 === b.tag ? c : null;
  }
  function Wb(a) {
    if (13 === a.tag) {
      var b = a.memoizedState;
      null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
      if (null !== b) return b.dehydrated;
    }
    return null;
  }
  function Xb(a) {
    if (Vb(a) !== a) throw Error(p(188));
  }
  function Yb(a) {
    var b = a.alternate;
    if (!b) {
      b = Vb(a);
      if (null === b) throw Error(p(188));
      return b !== a ? null : a;
    }
    for (var c = a, d = b; ; ) {
      var e = c.return;
      if (null === e) break;
      var f2 = e.alternate;
      if (null === f2) {
        d = e.return;
        if (null !== d) {
          c = d;
          continue;
        }
        break;
      }
      if (e.child === f2.child) {
        for (f2 = e.child; f2; ) {
          if (f2 === c) return Xb(e), a;
          if (f2 === d) return Xb(e), b;
          f2 = f2.sibling;
        }
        throw Error(p(188));
      }
      if (c.return !== d.return) c = e, d = f2;
      else {
        for (var g = false, h = e.child; h; ) {
          if (h === c) {
            g = true;
            c = e;
            d = f2;
            break;
          }
          if (h === d) {
            g = true;
            d = e;
            c = f2;
            break;
          }
          h = h.sibling;
        }
        if (!g) {
          for (h = f2.child; h; ) {
            if (h === c) {
              g = true;
              c = f2;
              d = e;
              break;
            }
            if (h === d) {
              g = true;
              d = f2;
              c = e;
              break;
            }
            h = h.sibling;
          }
          if (!g) throw Error(p(189));
        }
      }
      if (c.alternate !== d) throw Error(p(190));
    }
    if (3 !== c.tag) throw Error(p(188));
    return c.stateNode.current === c ? a : b;
  }
  function Zb(a) {
    a = Yb(a);
    return null !== a ? $b(a) : null;
  }
  function $b(a) {
    if (5 === a.tag || 6 === a.tag) return a;
    for (a = a.child; null !== a; ) {
      var b = $b(a);
      if (null !== b) return b;
      a = a.sibling;
    }
    return null;
  }
  var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
  function mc(a) {
    if (lc && "function" === typeof lc.onCommitFiberRoot) try {
      lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
    } catch (b) {
    }
  }
  var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
  function nc(a) {
    a >>>= 0;
    return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
  }
  var rc = 64, sc = 4194304;
  function tc(a) {
    switch (a & -a) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return a & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return a & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return a;
    }
  }
  function uc(a, b) {
    var c = a.pendingLanes;
    if (0 === c) return 0;
    var d = 0, e = a.suspendedLanes, f2 = a.pingedLanes, g = c & 268435455;
    if (0 !== g) {
      var h = g & ~e;
      0 !== h ? d = tc(h) : (f2 &= g, 0 !== f2 && (d = tc(f2)));
    } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f2 && (d = tc(f2));
    if (0 === d) return 0;
    if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f2 = b & -b, e >= f2 || 16 === e && 0 !== (f2 & 4194240))) return b;
    0 !== (d & 4) && (d |= c & 16);
    b = a.entangledLanes;
    if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
    return d;
  }
  function vc(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 4:
        return b + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return b + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function wc(a, b) {
    for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
      var g = 31 - oc(f2), h = 1 << g, k2 = e[g];
      if (-1 === k2) {
        if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
      } else k2 <= b && (a.expiredLanes |= h);
      f2 &= ~h;
    }
  }
  function xc(a) {
    a = a.pendingLanes & -1073741825;
    return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
  }
  function yc() {
    var a = rc;
    rc <<= 1;
    0 === (rc & 4194240) && (rc = 64);
    return a;
  }
  function zc(a) {
    for (var b = [], c = 0; 31 > c; c++) b.push(a);
    return b;
  }
  function Ac(a, b, c) {
    a.pendingLanes |= b;
    536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
    a = a.eventTimes;
    b = 31 - oc(b);
    a[b] = c;
  }
  function Bc(a, b) {
    var c = a.pendingLanes & ~b;
    a.pendingLanes = b;
    a.suspendedLanes = 0;
    a.pingedLanes = 0;
    a.expiredLanes &= b;
    a.mutableReadLanes &= b;
    a.entangledLanes &= b;
    b = a.entanglements;
    var d = a.eventTimes;
    for (a = a.expirationTimes; 0 < c; ) {
      var e = 31 - oc(c), f2 = 1 << e;
      b[e] = 0;
      d[e] = -1;
      a[e] = -1;
      c &= ~f2;
    }
  }
  function Cc(a, b) {
    var c = a.entangledLanes |= b;
    for (a = a.entanglements; c; ) {
      var d = 31 - oc(c), e = 1 << d;
      e & b | a[d] & b && (a[d] |= b);
      c &= ~e;
    }
  }
  var C = 0;
  function Dc(a) {
    a &= -a;
    return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
  }
  var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Sc(a, b) {
    switch (a) {
      case "focusin":
      case "focusout":
        Lc = null;
        break;
      case "dragenter":
      case "dragleave":
        Mc = null;
        break;
      case "mouseover":
      case "mouseout":
        Nc = null;
        break;
      case "pointerover":
      case "pointerout":
        Oc.delete(b.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Pc.delete(b.pointerId);
    }
  }
  function Tc(a, b, c, d, e, f2) {
    if (null === a || a.nativeEvent !== f2) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
    a.eventSystemFlags |= d;
    b = a.targetContainers;
    null !== e && -1 === b.indexOf(e) && b.push(e);
    return a;
  }
  function Uc(a, b, c, d, e) {
    switch (b) {
      case "focusin":
        return Lc = Tc(Lc, a, b, c, d, e), true;
      case "dragenter":
        return Mc = Tc(Mc, a, b, c, d, e), true;
      case "mouseover":
        return Nc = Tc(Nc, a, b, c, d, e), true;
      case "pointerover":
        var f2 = e.pointerId;
        Oc.set(f2, Tc(Oc.get(f2) || null, a, b, c, d, e));
        return true;
      case "gotpointercapture":
        return f2 = e.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b, c, d, e)), true;
    }
    return false;
  }
  function Vc(a) {
    var b = Wc(a.target);
    if (null !== b) {
      var c = Vb(b);
      if (null !== c) {
        if (b = c.tag, 13 === b) {
          if (b = Wb(c), null !== b) {
            a.blockedOn = b;
            Ic(a.priority, function() {
              Gc(c);
            });
            return;
          }
        } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
          a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
          return;
        }
      }
    }
    a.blockedOn = null;
  }
  function Xc(a) {
    if (null !== a.blockedOn) return false;
    for (var b = a.targetContainers; 0 < b.length; ) {
      var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
      if (null === c) {
        c = a.nativeEvent;
        var d = new c.constructor(c.type, c);
        wb = d;
        c.target.dispatchEvent(d);
        wb = null;
      } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
      b.shift();
    }
    return true;
  }
  function Zc(a, b, c) {
    Xc(a) && c.delete(b);
  }
  function $c() {
    Jc = false;
    null !== Lc && Xc(Lc) && (Lc = null);
    null !== Mc && Xc(Mc) && (Mc = null);
    null !== Nc && Xc(Nc) && (Nc = null);
    Oc.forEach(Zc);
    Pc.forEach(Zc);
  }
  function ad(a, b) {
    a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
  }
  function bd(a) {
    function b(b2) {
      return ad(b2, a);
    }
    if (0 < Kc.length) {
      ad(Kc[0], a);
      for (var c = 1; c < Kc.length; c++) {
        var d = Kc[c];
        d.blockedOn === a && (d.blockedOn = null);
      }
    }
    null !== Lc && ad(Lc, a);
    null !== Mc && ad(Mc, a);
    null !== Nc && ad(Nc, a);
    Oc.forEach(b);
    Pc.forEach(b);
    for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
    for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
  }
  var cd = ua.ReactCurrentBatchConfig, dd = true;
  function ed(a, b, c, d) {
    var e = C, f2 = cd.transition;
    cd.transition = null;
    try {
      C = 1, fd(a, b, c, d);
    } finally {
      C = e, cd.transition = f2;
    }
  }
  function gd(a, b, c, d) {
    var e = C, f2 = cd.transition;
    cd.transition = null;
    try {
      C = 4, fd(a, b, c, d);
    } finally {
      C = e, cd.transition = f2;
    }
  }
  function fd(a, b, c, d) {
    if (dd) {
      var e = Yc(a, b, c, d);
      if (null === e) hd(a, b, d, id, c), Sc(a, d);
      else if (Uc(e, a, b, c, d)) d.stopPropagation();
      else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
        for (; null !== e; ) {
          var f2 = Cb(e);
          null !== f2 && Ec(f2);
          f2 = Yc(a, b, c, d);
          null === f2 && hd(a, b, d, id, c);
          if (f2 === e) break;
          e = f2;
        }
        null !== e && d.stopPropagation();
      } else hd(a, b, d, null, c);
    }
  }
  var id = null;
  function Yc(a, b, c, d) {
    id = null;
    a = xb(d);
    a = Wc(a);
    if (null !== a) if (b = Vb(a), null === b) a = null;
    else if (c = b.tag, 13 === c) {
      a = Wb(b);
      if (null !== a) return a;
      a = null;
    } else if (3 === c) {
      if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
      a = null;
    } else b !== a && (a = null);
    id = a;
    return null;
  }
  function jd(a) {
    switch (a) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (ec()) {
          case fc:
            return 1;
          case gc:
            return 4;
          case hc:
          case ic:
            return 16;
          case jc:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var kd = null, ld = null, md = null;
  function nd() {
    if (md) return md;
    var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f2 = e.length;
    for (a = 0; a < c && b[a] === e[a]; a++) ;
    var g = c - a;
    for (d = 1; d <= g && b[c - d] === e[f2 - d]; d++) ;
    return md = e.slice(a, 1 < d ? 1 - d : void 0);
  }
  function od(a) {
    var b = a.keyCode;
    "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
    10 === a && (a = 13);
    return 32 <= a || 13 === a ? a : 0;
  }
  function pd() {
    return true;
  }
  function qd() {
    return false;
  }
  function rd(a) {
    function b(b2, d, e, f2, g) {
      this._reactName = b2;
      this._targetInst = e;
      this.type = d;
      this.nativeEvent = f2;
      this.target = g;
      this.currentTarget = null;
      for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f2) : f2[c]);
      this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
      this.isPropagationStopped = qd;
      return this;
    }
    A(b.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var a2 = this.nativeEvent;
      a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
    }, stopPropagation: function() {
      var a2 = this.nativeEvent;
      a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
    }, persist: function() {
    }, isPersistent: pd });
    return b;
  }
  var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
    return a.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
    return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
  }, movementX: function(a) {
    if ("movementX" in a) return a.movementX;
    a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
    return wd;
  }, movementY: function(a) {
    return "movementY" in a ? a.movementY : xd;
  } }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
  } }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Nd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Pd(a) {
    var b = this.nativeEvent;
    return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
  }
  function zd() {
    return Pd;
  }
  var Qd = A({}, ud, { key: function(a) {
    if (a.key) {
      var b = Md[a.key] || a.key;
      if ("Unidentified" !== b) return b;
    }
    return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
    return "keypress" === a.type ? od(a) : 0;
  }, keyCode: function(a) {
    return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  }, which: function(a) {
    return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  } }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
    deltaX: function(a) {
      return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
    },
    deltaY: function(a) {
      return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
  ia && "documentMode" in document && (be = document.documentMode);
  var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
  function ge(a, b) {
    switch (a) {
      case "keyup":
        return -1 !== $d.indexOf(b.keyCode);
      case "keydown":
        return 229 !== b.keyCode;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function he(a) {
    a = a.detail;
    return "object" === typeof a && "data" in a ? a.data : null;
  }
  var ie = false;
  function je(a, b) {
    switch (a) {
      case "compositionend":
        return he(b);
      case "keypress":
        if (32 !== b.which) return null;
        fe = true;
        return ee;
      case "textInput":
        return a = b.data, a === ee && fe ? null : a;
      default:
        return null;
    }
  }
  function ke(a, b) {
    if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
    switch (a) {
      case "paste":
        return null;
      case "keypress":
        if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
          if (b.char && 1 < b.char.length) return b.char;
          if (b.which) return String.fromCharCode(b.which);
        }
        return null;
      case "compositionend":
        return de && "ko" !== b.locale ? null : b.data;
      default:
        return null;
    }
  }
  var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function me(a) {
    var b = a && a.nodeName && a.nodeName.toLowerCase();
    return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
  }
  function ne(a, b, c, d) {
    Eb(d);
    b = oe(b, "onChange");
    0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
  }
  var pe = null, qe = null;
  function re(a) {
    se(a, 0);
  }
  function te(a) {
    var b = ue(a);
    if (Wa(b)) return a;
  }
  function ve(a, b) {
    if ("change" === a) return b;
  }
  var we = false;
  if (ia) {
    var xe;
    if (ia) {
      var ye = "oninput" in document;
      if (!ye) {
        var ze = document.createElement("div");
        ze.setAttribute("oninput", "return;");
        ye = "function" === typeof ze.oninput;
      }
      xe = ye;
    } else xe = false;
    we = xe && (!document.documentMode || 9 < document.documentMode);
  }
  function Ae() {
    pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
  }
  function Be(a) {
    if ("value" === a.propertyName && te(qe)) {
      var b = [];
      ne(b, qe, a, xb(a));
      Jb(re, b);
    }
  }
  function Ce(a, b, c) {
    "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
  }
  function De(a) {
    if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
  }
  function Ee(a, b) {
    if ("click" === a) return te(b);
  }
  function Fe(a, b) {
    if ("input" === a || "change" === a) return te(b);
  }
  function Ge(a, b) {
    return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
  }
  var He = "function" === typeof Object.is ? Object.is : Ge;
  function Ie(a, b) {
    if (He(a, b)) return true;
    if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
    var c = Object.keys(a), d = Object.keys(b);
    if (c.length !== d.length) return false;
    for (d = 0; d < c.length; d++) {
      var e = c[d];
      if (!ja.call(b, e) || !He(a[e], b[e])) return false;
    }
    return true;
  }
  function Je(a) {
    for (; a && a.firstChild; ) a = a.firstChild;
    return a;
  }
  function Ke(a, b) {
    var c = Je(a);
    a = 0;
    for (var d; c; ) {
      if (3 === c.nodeType) {
        d = a + c.textContent.length;
        if (a <= b && d >= b) return { node: c, offset: b - a };
        a = d;
      }
      a: {
        for (; c; ) {
          if (c.nextSibling) {
            c = c.nextSibling;
            break a;
          }
          c = c.parentNode;
        }
        c = void 0;
      }
      c = Je(c);
    }
  }
  function Le(a, b) {
    return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
  }
  function Me() {
    for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
      try {
        var c = "string" === typeof b.contentWindow.location.href;
      } catch (d) {
        c = false;
      }
      if (c) a = b.contentWindow;
      else break;
      b = Xa(a.document);
    }
    return b;
  }
  function Ne(a) {
    var b = a && a.nodeName && a.nodeName.toLowerCase();
    return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
  }
  function Oe(a) {
    var b = Me(), c = a.focusedElem, d = a.selectionRange;
    if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
      if (null !== d && Ne(c)) {
        if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
        else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
          a = a.getSelection();
          var e = c.textContent.length, f2 = Math.min(d.start, e);
          d = void 0 === d.end ? f2 : Math.min(d.end, e);
          !a.extend && f2 > d && (e = d, d = f2, f2 = e);
          e = Ke(c, f2);
          var g = Ke(
            c,
            d
          );
          e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f2 > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
        }
      }
      b = [];
      for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
      "function" === typeof c.focus && c.focus();
      for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
    }
  }
  var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
  function Ue(a, b, c) {
    var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
    Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
  }
  function Ve(a, b) {
    var c = {};
    c[a.toLowerCase()] = b.toLowerCase();
    c["Webkit" + a] = "webkit" + b;
    c["Moz" + a] = "moz" + b;
    return c;
  }
  var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
  ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
  function Ze(a) {
    if (Xe[a]) return Xe[a];
    if (!We[a]) return a;
    var b = We[a], c;
    for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
    return a;
  }
  var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function ff(a, b) {
    df.set(a, b);
    fa(b, [a]);
  }
  for (var gf = 0; gf < ef.length; gf++) {
    var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
    ff(jf, "on" + kf);
  }
  ff($e, "onAnimationEnd");
  ff(af, "onAnimationIteration");
  ff(bf, "onAnimationStart");
  ff("dblclick", "onDoubleClick");
  ff("focusin", "onFocus");
  ff("focusout", "onBlur");
  ff(cf, "onTransitionEnd");
  ha("onMouseEnter", ["mouseout", "mouseover"]);
  ha("onMouseLeave", ["mouseout", "mouseover"]);
  ha("onPointerEnter", ["pointerout", "pointerover"]);
  ha("onPointerLeave", ["pointerout", "pointerover"]);
  fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
  function nf(a, b, c) {
    var d = a.type || "unknown-event";
    a.currentTarget = c;
    Ub(d, b, void 0, a);
    a.currentTarget = null;
  }
  function se(a, b) {
    b = 0 !== (b & 4);
    for (var c = 0; c < a.length; c++) {
      var d = a[c], e = d.event;
      d = d.listeners;
      a: {
        var f2 = void 0;
        if (b) for (var g = d.length - 1; 0 <= g; g--) {
          var h = d[g], k2 = h.instance, l2 = h.currentTarget;
          h = h.listener;
          if (k2 !== f2 && e.isPropagationStopped()) break a;
          nf(e, h, l2);
          f2 = k2;
        }
        else for (g = 0; g < d.length; g++) {
          h = d[g];
          k2 = h.instance;
          l2 = h.currentTarget;
          h = h.listener;
          if (k2 !== f2 && e.isPropagationStopped()) break a;
          nf(e, h, l2);
          f2 = k2;
        }
      }
    }
    if (Qb) throw a = Rb, Qb = false, Rb = null, a;
  }
  function D(a, b) {
    var c = b[of];
    void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
    var d = a + "__bubble";
    c.has(d) || (pf(b, a, 2, false), c.add(d));
  }
  function qf(a, b, c) {
    var d = 0;
    b && (d |= 4);
    pf(c, a, d, b);
  }
  var rf = "_reactListening" + Math.random().toString(36).slice(2);
  function sf(a) {
    if (!a[rf]) {
      a[rf] = true;
      da.forEach(function(b2) {
        "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
      });
      var b = 9 === a.nodeType ? a : a.ownerDocument;
      null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
    }
  }
  function pf(a, b, c, d) {
    switch (jd(b)) {
      case 1:
        var e = ed;
        break;
      case 4:
        e = gd;
        break;
      default:
        e = fd;
    }
    c = e.bind(null, b, c, a);
    e = void 0;
    !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
    d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
  }
  function hd(a, b, c, d, e) {
    var f2 = d;
    if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
      if (null === d) return;
      var g = d.tag;
      if (3 === g || 4 === g) {
        var h = d.stateNode.containerInfo;
        if (h === e || 8 === h.nodeType && h.parentNode === e) break;
        if (4 === g) for (g = d.return; null !== g; ) {
          var k2 = g.tag;
          if (3 === k2 || 4 === k2) {
            if (k2 = g.stateNode.containerInfo, k2 === e || 8 === k2.nodeType && k2.parentNode === e) return;
          }
          g = g.return;
        }
        for (; null !== h; ) {
          g = Wc(h);
          if (null === g) return;
          k2 = g.tag;
          if (5 === k2 || 6 === k2) {
            d = f2 = g;
            continue a;
          }
          h = h.parentNode;
        }
      }
      d = d.return;
    }
    Jb(function() {
      var d2 = f2, e2 = xb(c), g2 = [];
      a: {
        var h2 = df.get(a);
        if (void 0 !== h2) {
          var k3 = td, n2 = a;
          switch (a) {
            case "keypress":
              if (0 === od(c)) break a;
            case "keydown":
            case "keyup":
              k3 = Rd;
              break;
            case "focusin":
              n2 = "focus";
              k3 = Fd;
              break;
            case "focusout":
              n2 = "blur";
              k3 = Fd;
              break;
            case "beforeblur":
            case "afterblur":
              k3 = Fd;
              break;
            case "click":
              if (2 === c.button) break a;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              k3 = Bd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              k3 = Dd;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              k3 = Vd;
              break;
            case $e:
            case af:
            case bf:
              k3 = Hd;
              break;
            case cf:
              k3 = Xd;
              break;
            case "scroll":
              k3 = vd;
              break;
            case "wheel":
              k3 = Zd;
              break;
            case "copy":
            case "cut":
            case "paste":
              k3 = Jd;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              k3 = Td;
          }
          var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
          t2 = [];
          for (var w2 = d2, u2; null !== w2; ) {
            u2 = w2;
            var F2 = u2.stateNode;
            5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
            if (J2) break;
            w2 = w2.return;
          }
          0 < t2.length && (h2 = new k3(h2, n2, null, c, e2), g2.push({ event: h2, listeners: t2 }));
        }
      }
      if (0 === (b & 7)) {
        a: {
          h2 = "mouseover" === a || "pointerover" === a;
          k3 = "mouseout" === a || "pointerout" === a;
          if (h2 && c !== wb && (n2 = c.relatedTarget || c.fromElement) && (Wc(n2) || n2[uf])) break a;
          if (k3 || h2) {
            h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
            if (k3) {
              if (n2 = c.relatedTarget || c.toElement, k3 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
            } else k3 = null, n2 = d2;
            if (k3 !== n2) {
              t2 = Bd;
              F2 = "onMouseLeave";
              x2 = "onMouseEnter";
              w2 = "mouse";
              if ("pointerout" === a || "pointerover" === a) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
              J2 = null == k3 ? h2 : ue(k3);
              u2 = null == n2 ? h2 : ue(n2);
              h2 = new t2(F2, w2 + "leave", k3, c, e2);
              h2.target = J2;
              h2.relatedTarget = u2;
              F2 = null;
              Wc(e2) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c, e2), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
              J2 = F2;
              if (k3 && n2) b: {
                t2 = k3;
                x2 = n2;
                w2 = 0;
                for (u2 = t2; u2; u2 = vf(u2)) w2++;
                u2 = 0;
                for (F2 = x2; F2; F2 = vf(F2)) u2++;
                for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
                for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
                for (; w2--; ) {
                  if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                  t2 = vf(t2);
                  x2 = vf(x2);
                }
                t2 = null;
              }
              else t2 = null;
              null !== k3 && wf(g2, h2, k3, t2, false);
              null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
            }
          }
        }
        a: {
          h2 = d2 ? ue(d2) : window;
          k3 = h2.nodeName && h2.nodeName.toLowerCase();
          if ("select" === k3 || "input" === k3 && "file" === h2.type) var na = ve;
          else if (me(h2)) if (we) na = Fe;
          else {
            na = De;
            var xa = Ce;
          }
          else (k3 = h2.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
          if (na && (na = na(a, d2))) {
            ne(g2, na, c, e2);
            break a;
          }
          xa && xa(a, h2, d2);
          "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
        }
        xa = d2 ? ue(d2) : window;
        switch (a) {
          case "focusin":
            if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
            break;
          case "focusout":
            Se = Re = Qe = null;
            break;
          case "mousedown":
            Te = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Te = false;
            Ue(g2, c, e2);
            break;
          case "selectionchange":
            if (Pe) break;
          case "keydown":
          case "keyup":
            Ue(g2, c, e2);
        }
        var $a;
        if (ae) b: {
          switch (a) {
            case "compositionstart":
              var ba = "onCompositionStart";
              break b;
            case "compositionend":
              ba = "onCompositionEnd";
              break b;
            case "compositionupdate":
              ba = "onCompositionUpdate";
              break b;
          }
          ba = void 0;
        }
        else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
        ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
        if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
      }
      se(g2, b);
    });
  }
  function tf(a, b, c) {
    return { instance: a, listener: b, currentTarget: c };
  }
  function oe(a, b) {
    for (var c = b + "Capture", d = []; null !== a; ) {
      var e = a, f2 = e.stateNode;
      5 === e.tag && null !== f2 && (e = f2, f2 = Kb(a, c), null != f2 && d.unshift(tf(a, f2, e)), f2 = Kb(a, b), null != f2 && d.push(tf(a, f2, e)));
      a = a.return;
    }
    return d;
  }
  function vf(a) {
    if (null === a) return null;
    do
      a = a.return;
    while (a && 5 !== a.tag);
    return a ? a : null;
  }
  function wf(a, b, c, d, e) {
    for (var f2 = b._reactName, g = []; null !== c && c !== d; ) {
      var h = c, k2 = h.alternate, l2 = h.stateNode;
      if (null !== k2 && k2 === d) break;
      5 === h.tag && null !== l2 && (h = l2, e ? (k2 = Kb(c, f2), null != k2 && g.unshift(tf(c, k2, h))) : e || (k2 = Kb(c, f2), null != k2 && g.push(tf(c, k2, h))));
      c = c.return;
    }
    0 !== g.length && a.push({ event: b, listeners: g });
  }
  var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
  function zf(a) {
    return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
  }
  function Af(a, b, c) {
    b = zf(b);
    if (zf(a) !== b && c) throw Error(p(425));
  }
  function Bf() {
  }
  var Cf = null, Df = null;
  function Ef(a, b) {
    return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
  }
  var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
    return Hf.resolve(null).then(a).catch(If);
  } : Ff;
  function If(a) {
    setTimeout(function() {
      throw a;
    });
  }
  function Kf(a, b) {
    var c = b, d = 0;
    do {
      var e = c.nextSibling;
      a.removeChild(c);
      if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
        if (0 === d) {
          a.removeChild(e);
          bd(b);
          return;
        }
        d--;
      } else "$" !== c && "$?" !== c && "$!" !== c || d++;
      c = e;
    } while (c);
    bd(b);
  }
  function Lf(a) {
    for (; null != a; a = a.nextSibling) {
      var b = a.nodeType;
      if (1 === b || 3 === b) break;
      if (8 === b) {
        b = a.data;
        if ("$" === b || "$!" === b || "$?" === b) break;
        if ("/$" === b) return null;
      }
    }
    return a;
  }
  function Mf(a) {
    a = a.previousSibling;
    for (var b = 0; a; ) {
      if (8 === a.nodeType) {
        var c = a.data;
        if ("$" === c || "$!" === c || "$?" === c) {
          if (0 === b) return a;
          b--;
        } else "/$" === c && b++;
      }
      a = a.previousSibling;
    }
    return null;
  }
  var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
  function Wc(a) {
    var b = a[Of];
    if (b) return b;
    for (var c = a.parentNode; c; ) {
      if (b = c[uf] || c[Of]) {
        c = b.alternate;
        if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
          if (c = a[Of]) return c;
          a = Mf(a);
        }
        return b;
      }
      a = c;
      c = a.parentNode;
    }
    return null;
  }
  function Cb(a) {
    a = a[Of] || a[uf];
    return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
  }
  function ue(a) {
    if (5 === a.tag || 6 === a.tag) return a.stateNode;
    throw Error(p(33));
  }
  function Db(a) {
    return a[Pf] || null;
  }
  var Sf = [], Tf = -1;
  function Uf(a) {
    return { current: a };
  }
  function E(a) {
    0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
  }
  function G(a, b) {
    Tf++;
    Sf[Tf] = a.current;
    a.current = b;
  }
  var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
  function Yf(a, b) {
    var c = a.type.contextTypes;
    if (!c) return Vf;
    var d = a.stateNode;
    if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
    var e = {}, f2;
    for (f2 in c) e[f2] = b[f2];
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
    return e;
  }
  function Zf(a) {
    a = a.childContextTypes;
    return null !== a && void 0 !== a;
  }
  function $f() {
    E(Wf);
    E(H);
  }
  function ag(a, b, c) {
    if (H.current !== Vf) throw Error(p(168));
    G(H, b);
    G(Wf, c);
  }
  function bg(a, b, c) {
    var d = a.stateNode;
    b = b.childContextTypes;
    if ("function" !== typeof d.getChildContext) return c;
    d = d.getChildContext();
    for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
    return A({}, c, d);
  }
  function cg(a) {
    a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
    Xf = H.current;
    G(H, a);
    G(Wf, Wf.current);
    return true;
  }
  function dg(a, b, c) {
    var d = a.stateNode;
    if (!d) throw Error(p(169));
    c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
    G(Wf, c);
  }
  var eg = null, fg = false, gg = false;
  function hg(a) {
    null === eg ? eg = [a] : eg.push(a);
  }
  function ig(a) {
    fg = true;
    hg(a);
  }
  function jg() {
    if (!gg && null !== eg) {
      gg = true;
      var a = 0, b = C;
      try {
        var c = eg;
        for (C = 1; a < c.length; a++) {
          var d = c[a];
          do
            d = d(true);
          while (null !== d);
        }
        eg = null;
        fg = false;
      } catch (e) {
        throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
      } finally {
        C = b, gg = false;
      }
    }
    return null;
  }
  var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
  function tg(a, b) {
    kg[lg++] = ng;
    kg[lg++] = mg;
    mg = a;
    ng = b;
  }
  function ug(a, b, c) {
    og[pg++] = rg;
    og[pg++] = sg;
    og[pg++] = qg;
    qg = a;
    var d = rg;
    a = sg;
    var e = 32 - oc(d) - 1;
    d &= ~(1 << e);
    c += 1;
    var f2 = 32 - oc(b) + e;
    if (30 < f2) {
      var g = e - e % 5;
      f2 = (d & (1 << g) - 1).toString(32);
      d >>= g;
      e -= g;
      rg = 1 << 32 - oc(b) + e | c << e | d;
      sg = f2 + a;
    } else rg = 1 << f2 | c << e | d, sg = a;
  }
  function vg(a) {
    null !== a.return && (tg(a, 1), ug(a, 1, 0));
  }
  function wg(a) {
    for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
    for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
  }
  var xg = null, yg = null, I = false, zg = null;
  function Ag(a, b) {
    var c = Bg(5, null, null, 0);
    c.elementType = "DELETED";
    c.stateNode = b;
    c.return = a;
    b = a.deletions;
    null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
  }
  function Cg(a, b) {
    switch (a.tag) {
      case 5:
        var c = a.type;
        b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
        return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
      case 6:
        return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
      case 13:
        return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
      default:
        return false;
    }
  }
  function Dg(a) {
    return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
  }
  function Eg(a) {
    if (I) {
      var b = yg;
      if (b) {
        var c = b;
        if (!Cg(a, b)) {
          if (Dg(a)) throw Error(p(418));
          b = Lf(c.nextSibling);
          var d = xg;
          b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
        }
      } else {
        if (Dg(a)) throw Error(p(418));
        a.flags = a.flags & -4097 | 2;
        I = false;
        xg = a;
      }
    }
  }
  function Fg(a) {
    for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
    xg = a;
  }
  function Gg(a) {
    if (a !== xg) return false;
    if (!I) return Fg(a), I = true, false;
    var b;
    (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
    if (b && (b = yg)) {
      if (Dg(a)) throw Hg(), Error(p(418));
      for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
    }
    Fg(a);
    if (13 === a.tag) {
      a = a.memoizedState;
      a = null !== a ? a.dehydrated : null;
      if (!a) throw Error(p(317));
      a: {
        a = a.nextSibling;
        for (b = 0; a; ) {
          if (8 === a.nodeType) {
            var c = a.data;
            if ("/$" === c) {
              if (0 === b) {
                yg = Lf(a.nextSibling);
                break a;
              }
              b--;
            } else "$" !== c && "$!" !== c && "$?" !== c || b++;
          }
          a = a.nextSibling;
        }
        yg = null;
      }
    } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
    return true;
  }
  function Hg() {
    for (var a = yg; a; ) a = Lf(a.nextSibling);
  }
  function Ig() {
    yg = xg = null;
    I = false;
  }
  function Jg(a) {
    null === zg ? zg = [a] : zg.push(a);
  }
  var Kg = ua.ReactCurrentBatchConfig;
  function Lg(a, b, c) {
    a = c.ref;
    if (null !== a && "function" !== typeof a && "object" !== typeof a) {
      if (c._owner) {
        c = c._owner;
        if (c) {
          if (1 !== c.tag) throw Error(p(309));
          var d = c.stateNode;
        }
        if (!d) throw Error(p(147, a));
        var e = d, f2 = "" + a;
        if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
        b = function(a2) {
          var b2 = e.refs;
          null === a2 ? delete b2[f2] : b2[f2] = a2;
        };
        b._stringRef = f2;
        return b;
      }
      if ("string" !== typeof a) throw Error(p(284));
      if (!c._owner) throw Error(p(290, a));
    }
    return a;
  }
  function Mg(a, b) {
    a = Object.prototype.toString.call(b);
    throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
  }
  function Ng(a) {
    var b = a._init;
    return b(a._payload);
  }
  function Og(a) {
    function b(b2, c2) {
      if (a) {
        var d2 = b2.deletions;
        null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
      }
    }
    function c(c2, d2) {
      if (!a) return null;
      for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
      return null;
    }
    function d(a2, b2) {
      for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
      return a2;
    }
    function e(a2, b2) {
      a2 = Pg(a2, b2);
      a2.index = 0;
      a2.sibling = null;
      return a2;
    }
    function f2(b2, c2, d2) {
      b2.index = d2;
      if (!a) return b2.flags |= 1048576, c2;
      d2 = b2.alternate;
      if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
      b2.flags |= 2;
      return c2;
    }
    function g(b2) {
      a && null === b2.alternate && (b2.flags |= 2);
      return b2;
    }
    function h(a2, b2, c2, d2) {
      if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
      b2 = e(b2, c2);
      b2.return = a2;
      return b2;
    }
    function k2(a2, b2, c2, d2) {
      var f3 = c2.type;
      if (f3 === ya) return m2(a2, b2, c2.props.children, d2, c2.key);
      if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
      d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
      d2.ref = Lg(a2, b2, c2);
      d2.return = a2;
      return d2;
    }
    function l2(a2, b2, c2, d2) {
      if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
      b2 = e(b2, c2.children || []);
      b2.return = a2;
      return b2;
    }
    function m2(a2, b2, c2, d2, f3) {
      if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f3), b2.return = a2, b2;
      b2 = e(b2, c2);
      b2.return = a2;
      return b2;
    }
    function q2(a2, b2, c2) {
      if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
      if ("object" === typeof b2 && null !== b2) {
        switch (b2.$$typeof) {
          case va:
            return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
          case wa:
            return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
          case Ha:
            var d2 = b2._init;
            return q2(a2, d2(b2._payload), c2);
        }
        if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
        Mg(a2, b2);
      }
      return null;
    }
    function r2(a2, b2, c2, d2) {
      var e2 = null !== b2 ? b2.key : null;
      if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
      if ("object" === typeof c2 && null !== c2) {
        switch (c2.$$typeof) {
          case va:
            return c2.key === e2 ? k2(a2, b2, c2, d2) : null;
          case wa:
            return c2.key === e2 ? l2(a2, b2, c2, d2) : null;
          case Ha:
            return e2 = c2._init, r2(
              a2,
              b2,
              e2(c2._payload),
              d2
            );
        }
        if (eb(c2) || Ka(c2)) return null !== e2 ? null : m2(a2, b2, c2, d2, null);
        Mg(a2, c2);
      }
      return null;
    }
    function y2(a2, b2, c2, d2, e2) {
      if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
      if ("object" === typeof d2 && null !== d2) {
        switch (d2.$$typeof) {
          case va:
            return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k2(b2, a2, d2, e2);
          case wa:
            return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l2(b2, a2, d2, e2);
          case Ha:
            var f3 = d2._init;
            return y2(a2, b2, c2, f3(d2._payload), e2);
        }
        if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m2(b2, a2, d2, e2, null);
        Mg(b2, d2);
      }
      return null;
    }
    function n2(e2, g2, h2, k3) {
      for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
        u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
        var n3 = r2(e2, u2, h2[w2], k3);
        if (null === n3) {
          null === u2 && (u2 = x2);
          break;
        }
        a && u2 && null === n3.alternate && b(e2, u2);
        g2 = f2(n3, g2, w2);
        null === m3 ? l3 = n3 : m3.sibling = n3;
        m3 = n3;
        u2 = x2;
      }
      if (w2 === h2.length) return c(e2, u2), I && tg(e2, w2), l3;
      if (null === u2) {
        for (; w2 < h2.length; w2++) u2 = q2(e2, h2[w2], k3), null !== u2 && (g2 = f2(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
        I && tg(e2, w2);
        return l3;
      }
      for (u2 = d(e2, u2); w2 < h2.length; w2++) x2 = y2(u2, e2, w2, h2[w2], k3), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f2(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
      a && u2.forEach(function(a2) {
        return b(e2, a2);
      });
      I && tg(e2, w2);
      return l3;
    }
    function t2(e2, g2, h2, k3) {
      var l3 = Ka(h2);
      if ("function" !== typeof l3) throw Error(p(150));
      h2 = l3.call(h2);
      if (null == h2) throw Error(p(151));
      for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
        m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
        var t3 = r2(e2, m3, n3.value, k3);
        if (null === t3) {
          null === m3 && (m3 = x2);
          break;
        }
        a && m3 && null === t3.alternate && b(e2, m3);
        g2 = f2(t3, g2, w2);
        null === u2 ? l3 = t3 : u2.sibling = t3;
        u2 = t3;
        m3 = x2;
      }
      if (n3.done) return c(
        e2,
        m3
      ), I && tg(e2, w2), l3;
      if (null === m3) {
        for (; !n3.done; w2++, n3 = h2.next()) n3 = q2(e2, n3.value, k3), null !== n3 && (g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
        I && tg(e2, w2);
        return l3;
      }
      for (m3 = d(e2, m3); !n3.done; w2++, n3 = h2.next()) n3 = y2(m3, e2, w2, n3.value, k3), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      a && m3.forEach(function(a2) {
        return b(e2, a2);
      });
      I && tg(e2, w2);
      return l3;
    }
    function J2(a2, d2, f3, h2) {
      "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
      if ("object" === typeof f3 && null !== f3) {
        switch (f3.$$typeof) {
          case va:
            a: {
              for (var k3 = f3.key, l3 = d2; null !== l3; ) {
                if (l3.key === k3) {
                  k3 = f3.type;
                  if (k3 === ya) {
                    if (7 === l3.tag) {
                      c(a2, l3.sibling);
                      d2 = e(l3, f3.props.children);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    }
                  } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                    c(a2, l3.sibling);
                    d2 = e(l3, f3.props);
                    d2.ref = Lg(a2, l3, f3);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                  c(a2, l3);
                  break;
                } else b(a2, l3);
                l3 = l3.sibling;
              }
              f3.type === ya ? (d2 = Tg(f3.props.children, a2.mode, h2, f3.key), d2.return = a2, a2 = d2) : (h2 = Rg(f3.type, f3.key, f3.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f3), h2.return = a2, a2 = h2);
            }
            return g(a2);
          case wa:
            a: {
              for (l3 = f3.key; null !== d2; ) {
                if (d2.key === l3) if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                  c(a2, d2.sibling);
                  d2 = e(d2, f3.children || []);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                } else {
                  c(a2, d2);
                  break;
                }
                else b(a2, d2);
                d2 = d2.sibling;
              }
              d2 = Sg(f3, a2.mode, h2);
              d2.return = a2;
              a2 = d2;
            }
            return g(a2);
          case Ha:
            return l3 = f3._init, J2(a2, d2, l3(f3._payload), h2);
        }
        if (eb(f3)) return n2(a2, d2, f3, h2);
        if (Ka(f3)) return t2(a2, d2, f3, h2);
        Mg(a2, f3);
      }
      return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f3, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
    }
    return J2;
  }
  var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
  function $g() {
    Zg = Yg = Xg = null;
  }
  function ah(a) {
    var b = Wg.current;
    E(Wg);
    a._currentValue = b;
  }
  function bh(a, b, c) {
    for (; null !== a; ) {
      var d = a.alternate;
      (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
      if (a === c) break;
      a = a.return;
    }
  }
  function ch(a, b) {
    Xg = a;
    Zg = Yg = null;
    a = a.dependencies;
    null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
  }
  function eh(a) {
    var b = a._currentValue;
    if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
      if (null === Xg) throw Error(p(308));
      Yg = a;
      Xg.dependencies = { lanes: 0, firstContext: a };
    } else Yg = Yg.next = a;
    return b;
  }
  var fh = null;
  function gh(a) {
    null === fh ? fh = [a] : fh.push(a);
  }
  function hh(a, b, c, d) {
    var e = b.interleaved;
    null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
    b.interleaved = c;
    return ih(a, d);
  }
  function ih(a, b) {
    a.lanes |= b;
    var c = a.alternate;
    null !== c && (c.lanes |= b);
    c = a;
    for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
    return 3 === c.tag ? c.stateNode : null;
  }
  var jh = false;
  function kh(a) {
    a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function lh(a, b) {
    a = a.updateQueue;
    b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
  }
  function mh(a, b) {
    return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
  }
  function nh(a, b, c) {
    var d = a.updateQueue;
    if (null === d) return null;
    d = d.shared;
    if (0 !== (K & 2)) {
      var e = d.pending;
      null === e ? b.next = b : (b.next = e.next, e.next = b);
      d.pending = b;
      return ih(a, c);
    }
    e = d.interleaved;
    null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
    d.interleaved = b;
    return ih(a, c);
  }
  function oh(a, b, c) {
    b = b.updateQueue;
    if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
      var d = b.lanes;
      d &= a.pendingLanes;
      c |= d;
      b.lanes = c;
      Cc(a, c);
    }
  }
  function ph(a, b) {
    var c = a.updateQueue, d = a.alternate;
    if (null !== d && (d = d.updateQueue, c === d)) {
      var e = null, f2 = null;
      c = c.firstBaseUpdate;
      if (null !== c) {
        do {
          var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
          null === f2 ? e = f2 = g : f2 = f2.next = g;
          c = c.next;
        } while (null !== c);
        null === f2 ? e = f2 = b : f2 = f2.next = b;
      } else e = f2 = b;
      c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
      a.updateQueue = c;
      return;
    }
    a = c.lastBaseUpdate;
    null === a ? c.firstBaseUpdate = b : a.next = b;
    c.lastBaseUpdate = b;
  }
  function qh(a, b, c, d) {
    var e = a.updateQueue;
    jh = false;
    var f2 = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
    if (null !== h) {
      e.shared.pending = null;
      var k2 = h, l2 = k2.next;
      k2.next = null;
      null === g ? f2 = l2 : g.next = l2;
      g = k2;
      var m2 = a.alternate;
      null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k2));
    }
    if (null !== f2) {
      var q2 = e.baseState;
      g = 0;
      m2 = l2 = k2 = null;
      h = f2;
      do {
        var r2 = h.lane, y2 = h.eventTime;
        if ((d & r2) === r2) {
          null !== m2 && (m2 = m2.next = {
            eventTime: y2,
            lane: 0,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          });
          a: {
            var n2 = a, t2 = h;
            r2 = b;
            y2 = c;
            switch (t2.tag) {
              case 1:
                n2 = t2.payload;
                if ("function" === typeof n2) {
                  q2 = n2.call(y2, q2, r2);
                  break a;
                }
                q2 = n2;
                break a;
              case 3:
                n2.flags = n2.flags & -65537 | 128;
              case 0:
                n2 = t2.payload;
                r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
                if (null === r2 || void 0 === r2) break a;
                q2 = A({}, q2, r2);
                break a;
              case 2:
                jh = true;
            }
          }
          null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
        } else y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g |= r2;
        h = h.next;
        if (null === h) if (h = e.shared.pending, null === h) break;
        else r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
      } while (1);
      null === m2 && (k2 = q2);
      e.baseState = k2;
      e.firstBaseUpdate = l2;
      e.lastBaseUpdate = m2;
      b = e.shared.interleaved;
      if (null !== b) {
        e = b;
        do
          g |= e.lane, e = e.next;
        while (e !== b);
      } else null === f2 && (e.shared.lanes = 0);
      rh |= g;
      a.lanes = g;
      a.memoizedState = q2;
    }
  }
  function sh(a, b, c) {
    a = b.effects;
    b.effects = null;
    if (null !== a) for (b = 0; b < a.length; b++) {
      var d = a[b], e = d.callback;
      if (null !== e) {
        d.callback = null;
        d = c;
        if ("function" !== typeof e) throw Error(p(191, e));
        e.call(d);
      }
    }
  }
  var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
  function xh(a) {
    if (a === th) throw Error(p(174));
    return a;
  }
  function yh(a, b) {
    G(wh, b);
    G(vh, a);
    G(uh, th);
    a = b.nodeType;
    switch (a) {
      case 9:
      case 11:
        b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
        break;
      default:
        a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
    }
    E(uh);
    G(uh, b);
  }
  function zh() {
    E(uh);
    E(vh);
    E(wh);
  }
  function Ah(a) {
    xh(wh.current);
    var b = xh(uh.current);
    var c = lb(b, a.type);
    b !== c && (G(vh, a), G(uh, c));
  }
  function Bh(a) {
    vh.current === a && (E(uh), E(vh));
  }
  var L = Uf(0);
  function Ch(a) {
    for (var b = a; null !== b; ) {
      if (13 === b.tag) {
        var c = b.memoizedState;
        if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
      } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
        if (0 !== (b.flags & 128)) return b;
      } else if (null !== b.child) {
        b.child.return = b;
        b = b.child;
        continue;
      }
      if (b === a) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a) return null;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
    return null;
  }
  var Dh = [];
  function Eh() {
    for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
    Dh.length = 0;
  }
  var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
  function P() {
    throw Error(p(321));
  }
  function Mh(a, b) {
    if (null === b) return false;
    for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
    return true;
  }
  function Nh(a, b, c, d, e, f2) {
    Hh = f2;
    M = b;
    b.memoizedState = null;
    b.updateQueue = null;
    b.lanes = 0;
    Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
    a = c(d, e);
    if (Jh) {
      f2 = 0;
      do {
        Jh = false;
        Kh = 0;
        if (25 <= f2) throw Error(p(301));
        f2 += 1;
        O = N = null;
        b.updateQueue = null;
        Fh.current = Qh;
        a = c(d, e);
      } while (Jh);
    }
    Fh.current = Rh;
    b = null !== N && null !== N.next;
    Hh = 0;
    O = N = M = null;
    Ih = false;
    if (b) throw Error(p(300));
    return a;
  }
  function Sh() {
    var a = 0 !== Kh;
    Kh = 0;
    return a;
  }
  function Th() {
    var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    null === O ? M.memoizedState = O = a : O = O.next = a;
    return O;
  }
  function Uh() {
    if (null === N) {
      var a = M.alternate;
      a = null !== a ? a.memoizedState : null;
    } else a = N.next;
    var b = null === O ? M.memoizedState : O.next;
    if (null !== b) O = b, N = a;
    else {
      if (null === a) throw Error(p(310));
      N = a;
      a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
      null === O ? M.memoizedState = O = a : O = O.next = a;
    }
    return O;
  }
  function Vh(a, b) {
    return "function" === typeof b ? b(a) : b;
  }
  function Wh(a) {
    var b = Uh(), c = b.queue;
    if (null === c) throw Error(p(311));
    c.lastRenderedReducer = a;
    var d = N, e = d.baseQueue, f2 = c.pending;
    if (null !== f2) {
      if (null !== e) {
        var g = e.next;
        e.next = f2.next;
        f2.next = g;
      }
      d.baseQueue = e = f2;
      c.pending = null;
    }
    if (null !== e) {
      f2 = e.next;
      d = d.baseState;
      var h = g = null, k2 = null, l2 = f2;
      do {
        var m2 = l2.lane;
        if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
        else {
          var q2 = {
            lane: m2,
            action: l2.action,
            hasEagerState: l2.hasEagerState,
            eagerState: l2.eagerState,
            next: null
          };
          null === k2 ? (h = k2 = q2, g = d) : k2 = k2.next = q2;
          M.lanes |= m2;
          rh |= m2;
        }
        l2 = l2.next;
      } while (null !== l2 && l2 !== f2);
      null === k2 ? g = d : k2.next = h;
      He(d, b.memoizedState) || (dh = true);
      b.memoizedState = d;
      b.baseState = g;
      b.baseQueue = k2;
      c.lastRenderedState = d;
    }
    a = c.interleaved;
    if (null !== a) {
      e = a;
      do
        f2 = e.lane, M.lanes |= f2, rh |= f2, e = e.next;
      while (e !== a);
    } else null === e && (c.lanes = 0);
    return [b.memoizedState, c.dispatch];
  }
  function Xh(a) {
    var b = Uh(), c = b.queue;
    if (null === c) throw Error(p(311));
    c.lastRenderedReducer = a;
    var d = c.dispatch, e = c.pending, f2 = b.memoizedState;
    if (null !== e) {
      c.pending = null;
      var g = e = e.next;
      do
        f2 = a(f2, g.action), g = g.next;
      while (g !== e);
      He(f2, b.memoizedState) || (dh = true);
      b.memoizedState = f2;
      null === b.baseQueue && (b.baseState = f2);
      c.lastRenderedState = f2;
    }
    return [f2, d];
  }
  function Yh() {
  }
  function Zh(a, b) {
    var c = M, d = Uh(), e = b(), f2 = !He(d.memoizedState, e);
    f2 && (d.memoizedState = e, dh = true);
    d = d.queue;
    $h(ai.bind(null, c, d, a), [a]);
    if (d.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
      c.flags |= 2048;
      bi(9, ci.bind(null, c, d, e, b), void 0, null);
      if (null === Q) throw Error(p(349));
      0 !== (Hh & 30) || di(c, b, e);
    }
    return e;
  }
  function di(a, b, c) {
    a.flags |= 16384;
    a = { getSnapshot: b, value: c };
    b = M.updateQueue;
    null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
  }
  function ci(a, b, c, d) {
    b.value = c;
    b.getSnapshot = d;
    ei(b) && fi(a);
  }
  function ai(a, b, c) {
    return c(function() {
      ei(b) && fi(a);
    });
  }
  function ei(a) {
    var b = a.getSnapshot;
    a = a.value;
    try {
      var c = b();
      return !He(a, c);
    } catch (d) {
      return true;
    }
  }
  function fi(a) {
    var b = ih(a, 1);
    null !== b && gi(b, a, 1, -1);
  }
  function hi(a) {
    var b = Th();
    "function" === typeof a && (a = a());
    b.memoizedState = b.baseState = a;
    a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
    b.queue = a;
    a = a.dispatch = ii.bind(null, M, a);
    return [b.memoizedState, a];
  }
  function bi(a, b, c, d) {
    a = { tag: a, create: b, destroy: c, deps: d, next: null };
    b = M.updateQueue;
    null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
    return a;
  }
  function ji() {
    return Uh().memoizedState;
  }
  function ki(a, b, c, d) {
    var e = Th();
    M.flags |= a;
    e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
  }
  function li(a, b, c, d) {
    var e = Uh();
    d = void 0 === d ? null : d;
    var f2 = void 0;
    if (null !== N) {
      var g = N.memoizedState;
      f2 = g.destroy;
      if (null !== d && Mh(d, g.deps)) {
        e.memoizedState = bi(b, c, f2, d);
        return;
      }
    }
    M.flags |= a;
    e.memoizedState = bi(1 | b, c, f2, d);
  }
  function mi(a, b) {
    return ki(8390656, 8, a, b);
  }
  function $h(a, b) {
    return li(2048, 8, a, b);
  }
  function ni(a, b) {
    return li(4, 2, a, b);
  }
  function oi(a, b) {
    return li(4, 4, a, b);
  }
  function pi(a, b) {
    if ("function" === typeof b) return a = a(), b(a), function() {
      b(null);
    };
    if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
      b.current = null;
    };
  }
  function qi(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return li(4, 4, pi.bind(null, b, a), c);
  }
  function ri() {
  }
  function si(a, b) {
    var c = Uh();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Mh(b, d[1])) return d[0];
    c.memoizedState = [a, b];
    return a;
  }
  function ti(a, b) {
    var c = Uh();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Mh(b, d[1])) return d[0];
    a = a();
    c.memoizedState = [a, b];
    return a;
  }
  function ui(a, b, c) {
    if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
    He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
    return b;
  }
  function vi(a, b) {
    var c = C;
    C = 0 !== c && 4 > c ? c : 4;
    a(true);
    var d = Gh.transition;
    Gh.transition = {};
    try {
      a(false), b();
    } finally {
      C = c, Gh.transition = d;
    }
  }
  function wi() {
    return Uh().memoizedState;
  }
  function xi(a, b, c) {
    var d = yi(a);
    c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
    if (zi(a)) Ai(b, c);
    else if (c = hh(a, b, c, d), null !== c) {
      var e = R();
      gi(c, a, d, e);
      Bi(c, b, d);
    }
  }
  function ii(a, b, c) {
    var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
    if (zi(a)) Ai(b, e);
    else {
      var f2 = a.alternate;
      if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
        var g = b.lastRenderedState, h = f2(g, c);
        e.hasEagerState = true;
        e.eagerState = h;
        if (He(h, g)) {
          var k2 = b.interleaved;
          null === k2 ? (e.next = e, gh(b)) : (e.next = k2.next, k2.next = e);
          b.interleaved = e;
          return;
        }
      } catch (l2) {
      } finally {
      }
      c = hh(a, b, e, d);
      null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
    }
  }
  function zi(a) {
    var b = a.alternate;
    return a === M || null !== b && b === M;
  }
  function Ai(a, b) {
    Jh = Ih = true;
    var c = a.pending;
    null === c ? b.next = b : (b.next = c.next, c.next = b);
    a.pending = b;
  }
  function Bi(a, b, c) {
    if (0 !== (c & 4194240)) {
      var d = b.lanes;
      d &= a.pendingLanes;
      c |= d;
      b.lanes = c;
      Cc(a, c);
    }
  }
  var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
    Th().memoizedState = [a, void 0 === b ? null : b];
    return a;
  }, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return ki(
      4194308,
      4,
      pi.bind(null, b, a),
      c
    );
  }, useLayoutEffect: function(a, b) {
    return ki(4194308, 4, a, b);
  }, useInsertionEffect: function(a, b) {
    return ki(4, 2, a, b);
  }, useMemo: function(a, b) {
    var c = Th();
    b = void 0 === b ? null : b;
    a = a();
    c.memoizedState = [a, b];
    return a;
  }, useReducer: function(a, b, c) {
    var d = Th();
    b = void 0 !== c ? c(b) : b;
    d.memoizedState = d.baseState = b;
    a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
    d.queue = a;
    a = a.dispatch = xi.bind(null, M, a);
    return [d.memoizedState, a];
  }, useRef: function(a) {
    var b = Th();
    a = { current: a };
    return b.memoizedState = a;
  }, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
    return Th().memoizedState = a;
  }, useTransition: function() {
    var a = hi(false), b = a[0];
    a = vi.bind(null, a[1]);
    Th().memoizedState = a;
    return [b, a];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(a, b, c) {
    var d = M, e = Th();
    if (I) {
      if (void 0 === c) throw Error(p(407));
      c = c();
    } else {
      c = b();
      if (null === Q) throw Error(p(349));
      0 !== (Hh & 30) || di(d, b, c);
    }
    e.memoizedState = c;
    var f2 = { value: c, getSnapshot: b };
    e.queue = f2;
    mi(ai.bind(
      null,
      d,
      f2,
      a
    ), [a]);
    d.flags |= 2048;
    bi(9, ci.bind(null, d, f2, c, b), void 0, null);
    return c;
  }, useId: function() {
    var a = Th(), b = Q.identifierPrefix;
    if (I) {
      var c = sg;
      var d = rg;
      c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
      b = ":" + b + "R" + c;
      c = Kh++;
      0 < c && (b += "H" + c.toString(32));
      b += ":";
    } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
    return a.memoizedState = b;
  }, unstable_isNewReconciler: false }, Ph = {
    readContext: eh,
    useCallback: si,
    useContext: eh,
    useEffect: $h,
    useImperativeHandle: qi,
    useInsertionEffect: ni,
    useLayoutEffect: oi,
    useMemo: ti,
    useReducer: Wh,
    useRef: ji,
    useState: function() {
      return Wh(Vh);
    },
    useDebugValue: ri,
    useDeferredValue: function(a) {
      var b = Uh();
      return ui(b, N.memoizedState, a);
    },
    useTransition: function() {
      var a = Wh(Vh)[0], b = Uh().memoizedState;
      return [a, b];
    },
    useMutableSource: Yh,
    useSyncExternalStore: Zh,
    useId: wi,
    unstable_isNewReconciler: false
  }, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
    return Xh(Vh);
  }, useDebugValue: ri, useDeferredValue: function(a) {
    var b = Uh();
    return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
  }, useTransition: function() {
    var a = Xh(Vh)[0], b = Uh().memoizedState;
    return [a, b];
  }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
  function Ci(a, b) {
    if (a && a.defaultProps) {
      b = A({}, b);
      a = a.defaultProps;
      for (var c in a) void 0 === b[c] && (b[c] = a[c]);
      return b;
    }
    return b;
  }
  function Di(a, b, c, d) {
    b = a.memoizedState;
    c = c(d, b);
    c = null === c || void 0 === c ? b : A({}, b, c);
    a.memoizedState = c;
    0 === a.lanes && (a.updateQueue.baseState = c);
  }
  var Ei = { isMounted: function(a) {
    return (a = a._reactInternals) ? Vb(a) === a : false;
  }, enqueueSetState: function(a, b, c) {
    a = a._reactInternals;
    var d = R(), e = yi(a), f2 = mh(d, e);
    f2.payload = b;
    void 0 !== c && null !== c && (f2.callback = c);
    b = nh(a, f2, e);
    null !== b && (gi(b, a, e, d), oh(b, a, e));
  }, enqueueReplaceState: function(a, b, c) {
    a = a._reactInternals;
    var d = R(), e = yi(a), f2 = mh(d, e);
    f2.tag = 1;
    f2.payload = b;
    void 0 !== c && null !== c && (f2.callback = c);
    b = nh(a, f2, e);
    null !== b && (gi(b, a, e, d), oh(b, a, e));
  }, enqueueForceUpdate: function(a, b) {
    a = a._reactInternals;
    var c = R(), d = yi(a), e = mh(c, d);
    e.tag = 2;
    void 0 !== b && null !== b && (e.callback = b);
    b = nh(a, e, d);
    null !== b && (gi(b, a, d, c), oh(b, a, d));
  } };
  function Fi(a, b, c, d, e, f2, g) {
    a = a.stateNode;
    return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f2) : true;
  }
  function Gi(a, b, c) {
    var d = false, e = Vf;
    var f2 = b.contextType;
    "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
    b = new b(c, f2);
    a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
    b.updater = Ei;
    a.stateNode = b;
    b._reactInternals = a;
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f2);
    return b;
  }
  function Hi(a, b, c, d) {
    a = b.state;
    "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
    "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
    b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
  }
  function Ii(a, b, c, d) {
    var e = a.stateNode;
    e.props = c;
    e.state = a.memoizedState;
    e.refs = {};
    kh(a);
    var f2 = b.contextType;
    "object" === typeof f2 && null !== f2 ? e.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e.context = Yf(a, f2));
    e.state = a.memoizedState;
    f2 = b.getDerivedStateFromProps;
    "function" === typeof f2 && (Di(a, b, f2, c), e.state = a.memoizedState);
    "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
    "function" === typeof e.componentDidMount && (a.flags |= 4194308);
  }
  function Ji(a, b) {
    try {
      var c = "", d = b;
      do
        c += Pa(d), d = d.return;
      while (d);
      var e = c;
    } catch (f2) {
      e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
    }
    return { value: a, source: b, stack: e, digest: null };
  }
  function Ki(a, b, c) {
    return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
  }
  function Li(a, b) {
    try {
      console.error(b.value);
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  var Mi = "function" === typeof WeakMap ? WeakMap : Map;
  function Ni(a, b, c) {
    c = mh(-1, c);
    c.tag = 3;
    c.payload = { element: null };
    var d = b.value;
    c.callback = function() {
      Oi || (Oi = true, Pi = d);
      Li(a, b);
    };
    return c;
  }
  function Qi(a, b, c) {
    c = mh(-1, c);
    c.tag = 3;
    var d = a.type.getDerivedStateFromError;
    if ("function" === typeof d) {
      var e = b.value;
      c.payload = function() {
        return d(e);
      };
      c.callback = function() {
        Li(a, b);
      };
    }
    var f2 = a.stateNode;
    null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
      Li(a, b);
      "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
      var c2 = b.stack;
      this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
    });
    return c;
  }
  function Si(a, b, c) {
    var d = a.pingCache;
    if (null === d) {
      d = a.pingCache = new Mi();
      var e = /* @__PURE__ */ new Set();
      d.set(b, e);
    } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
    e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
  }
  function Ui(a) {
    do {
      var b;
      if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
      if (b) return a;
      a = a.return;
    } while (null !== a);
    return null;
  }
  function Vi(a, b, c, d, e) {
    if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
    a.flags |= 65536;
    a.lanes = e;
    return a;
  }
  var Wi = ua.ReactCurrentOwner, dh = false;
  function Xi(a, b, c, d) {
    b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
  }
  function Yi(a, b, c, d, e) {
    c = c.render;
    var f2 = b.ref;
    ch(b, e);
    d = Nh(a, b, c, d, f2, e);
    c = Sh();
    if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
    I && c && vg(b);
    b.flags |= 1;
    Xi(a, b, d, e);
    return b.child;
  }
  function $i(a, b, c, d, e) {
    if (null === a) {
      var f2 = c.type;
      if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f2, bj(a, b, f2, d, e);
      a = Rg(c.type, null, d, b, b.mode, e);
      a.ref = b.ref;
      a.return = b;
      return b.child = a;
    }
    f2 = a.child;
    if (0 === (a.lanes & e)) {
      var g = f2.memoizedProps;
      c = c.compare;
      c = null !== c ? c : Ie;
      if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
    }
    b.flags |= 1;
    a = Pg(f2, d);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  function bj(a, b, c, d, e) {
    if (null !== a) {
      var f2 = a.memoizedProps;
      if (Ie(f2, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f2, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
      else return b.lanes = a.lanes, Zi(a, b, e);
    }
    return cj(a, b, c, d, e);
  }
  function dj(a, b, c) {
    var d = b.pendingProps, e = d.children, f2 = null !== a ? a.memoizedState : null;
    if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
    else {
      if (0 === (c & 1073741824)) return a = null !== f2 ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
      b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
      d = null !== f2 ? f2.baseLanes : c;
      G(ej, fj);
      fj |= d;
    }
    else null !== f2 ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
    Xi(a, b, e, c);
    return b.child;
  }
  function gj(a, b) {
    var c = b.ref;
    if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
  }
  function cj(a, b, c, d, e) {
    var f2 = Zf(c) ? Xf : H.current;
    f2 = Yf(b, f2);
    ch(b, e);
    c = Nh(a, b, c, d, f2, e);
    d = Sh();
    if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
    I && d && vg(b);
    b.flags |= 1;
    Xi(a, b, c, e);
    return b.child;
  }
  function hj(a, b, c, d, e) {
    if (Zf(c)) {
      var f2 = true;
      cg(b);
    } else f2 = false;
    ch(b, e);
    if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
    else if (null === a) {
      var g = b.stateNode, h = b.memoizedProps;
      g.props = h;
      var k2 = g.context, l2 = c.contextType;
      "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c) ? Xf : H.current, l2 = Yf(b, l2));
      var m2 = c.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
      q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k2 !== l2) && Hi(b, g, d, l2);
      jh = false;
      var r2 = b.memoizedState;
      g.state = r2;
      qh(b, d, g, e);
      k2 = b.memoizedState;
      h !== d || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c, m2, d), k2 = b.memoizedState), (h = jh || Fi(b, c, h, d, r2, k2, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
    } else {
      g = b.stateNode;
      lh(a, b);
      h = b.memoizedProps;
      l2 = b.type === b.elementType ? h : Ci(b.type, h);
      g.props = l2;
      q2 = b.pendingProps;
      r2 = g.context;
      k2 = c.contextType;
      "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c) ? Xf : H.current, k2 = Yf(b, k2));
      var y2 = c.getDerivedStateFromProps;
      (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q2 || r2 !== k2) && Hi(b, g, d, k2);
      jh = false;
      r2 = b.memoizedState;
      g.state = r2;
      qh(b, d, g, e);
      var n2 = b.memoizedState;
      h !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c, y2, d), n2 = b.memoizedState), (l2 = jh || Fi(b, c, l2, d, r2, n2, k2) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k2), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k2)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k2, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
    }
    return jj(a, b, c, d, f2, e);
  }
  function jj(a, b, c, d, e, f2) {
    gj(a, b);
    var g = 0 !== (b.flags & 128);
    if (!d && !g) return e && dg(b, c, false), Zi(a, b, f2);
    d = b.stateNode;
    Wi.current = b;
    var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
    b.flags |= 1;
    null !== a && g ? (b.child = Ug(b, a.child, null, f2), b.child = Ug(b, null, h, f2)) : Xi(a, b, h, f2);
    b.memoizedState = d.state;
    e && dg(b, c, true);
    return b.child;
  }
  function kj(a) {
    var b = a.stateNode;
    b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
    yh(a, b.containerInfo);
  }
  function lj(a, b, c, d, e) {
    Ig();
    Jg(e);
    b.flags |= 256;
    Xi(a, b, c, d);
    return b.child;
  }
  var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
  function nj(a) {
    return { baseLanes: a, cachePool: null, transitions: null };
  }
  function oj(a, b, c) {
    var d = b.pendingProps, e = L.current, f2 = false, g = 0 !== (b.flags & 128), h;
    (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
    if (h) f2 = true, b.flags &= -129;
    else if (null === a || null !== a.memoizedState) e |= 1;
    G(L, e & 1);
    if (null === a) {
      Eg(b);
      a = b.memoizedState;
      if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
      g = d.children;
      a = d.fallback;
      return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d, 0, null), a = Tg(a, d, c, null), f2.return = b, a.return = b, f2.sibling = a, b.child = f2, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
    }
    e = a.memoizedState;
    if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
    if (f2) {
      f2 = d.fallback;
      g = b.mode;
      e = a.child;
      h = e.sibling;
      var k2 = { mode: "hidden", children: d.children };
      0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k2, b.deletions = null) : (d = Pg(e, k2), d.subtreeFlags = e.subtreeFlags & 14680064);
      null !== h ? f2 = Pg(h, f2) : (f2 = Tg(f2, g, c, null), f2.flags |= 2);
      f2.return = b;
      d.return = b;
      d.sibling = f2;
      b.child = d;
      d = f2;
      f2 = b.child;
      g = a.child.memoizedState;
      g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
      f2.memoizedState = g;
      f2.childLanes = a.childLanes & ~c;
      b.memoizedState = mj;
      return d;
    }
    f2 = a.child;
    a = f2.sibling;
    d = Pg(f2, { mode: "visible", children: d.children });
    0 === (b.mode & 1) && (d.lanes = c);
    d.return = b;
    d.sibling = null;
    null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
    b.child = d;
    b.memoizedState = null;
    return d;
  }
  function qj(a, b) {
    b = pj({ mode: "visible", children: b }, a.mode, 0, null);
    b.return = a;
    return a.child = b;
  }
  function sj(a, b, c, d) {
    null !== d && Jg(d);
    Ug(b, a.child, null, c);
    a = qj(b, b.pendingProps.children);
    a.flags |= 2;
    b.memoizedState = null;
    return a;
  }
  function rj(a, b, c, d, e, f2, g) {
    if (c) {
      if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
      if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
      f2 = d.fallback;
      e = b.mode;
      d = pj({ mode: "visible", children: d.children }, e, 0, null);
      f2 = Tg(f2, e, g, null);
      f2.flags |= 2;
      d.return = b;
      f2.return = b;
      d.sibling = f2;
      b.child = d;
      0 !== (b.mode & 1) && Ug(b, a.child, null, g);
      b.child.memoizedState = nj(g);
      b.memoizedState = mj;
      return f2;
    }
    if (0 === (b.mode & 1)) return sj(a, b, g, null);
    if ("$!" === e.data) {
      d = e.nextSibling && e.nextSibling.dataset;
      if (d) var h = d.dgst;
      d = h;
      f2 = Error(p(419));
      d = Ki(f2, d, void 0);
      return sj(a, b, g, d);
    }
    h = 0 !== (g & a.childLanes);
    if (dh || h) {
      d = Q;
      if (null !== d) {
        switch (g & -g) {
          case 4:
            e = 2;
            break;
          case 16:
            e = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            e = 32;
            break;
          case 536870912:
            e = 268435456;
            break;
          default:
            e = 0;
        }
        e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
        0 !== e && e !== f2.retryLane && (f2.retryLane = e, ih(a, e), gi(d, a, e, -1));
      }
      tj();
      d = Ki(Error(p(421)));
      return sj(a, b, g, d);
    }
    if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
    a = f2.treeContext;
    yg = Lf(e.nextSibling);
    xg = b;
    I = true;
    zg = null;
    null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
    b = qj(b, d.children);
    b.flags |= 4096;
    return b;
  }
  function vj(a, b, c) {
    a.lanes |= b;
    var d = a.alternate;
    null !== d && (d.lanes |= b);
    bh(a.return, b, c);
  }
  function wj(a, b, c, d, e) {
    var f2 = a.memoizedState;
    null === f2 ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e);
  }
  function xj(a, b, c) {
    var d = b.pendingProps, e = d.revealOrder, f2 = d.tail;
    Xi(a, b, d.children, c);
    d = L.current;
    if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
    else {
      if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
        if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
        else if (19 === a.tag) vj(a, c, b);
        else if (null !== a.child) {
          a.child.return = a;
          a = a.child;
          continue;
        }
        if (a === b) break a;
        for (; null === a.sibling; ) {
          if (null === a.return || a.return === b) break a;
          a = a.return;
        }
        a.sibling.return = a.return;
        a = a.sibling;
      }
      d &= 1;
    }
    G(L, d);
    if (0 === (b.mode & 1)) b.memoizedState = null;
    else switch (e) {
      case "forwards":
        c = b.child;
        for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
        c = e;
        null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
        wj(b, false, e, c, f2);
        break;
      case "backwards":
        c = null;
        e = b.child;
        for (b.child = null; null !== e; ) {
          a = e.alternate;
          if (null !== a && null === Ch(a)) {
            b.child = e;
            break;
          }
          a = e.sibling;
          e.sibling = c;
          c = e;
          e = a;
        }
        wj(b, true, c, null, f2);
        break;
      case "together":
        wj(b, false, null, null, void 0);
        break;
      default:
        b.memoizedState = null;
    }
    return b.child;
  }
  function ij(a, b) {
    0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
  }
  function Zi(a, b, c) {
    null !== a && (b.dependencies = a.dependencies);
    rh |= b.lanes;
    if (0 === (c & b.childLanes)) return null;
    if (null !== a && b.child !== a.child) throw Error(p(153));
    if (null !== b.child) {
      a = b.child;
      c = Pg(a, a.pendingProps);
      b.child = c;
      for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
      c.sibling = null;
    }
    return b.child;
  }
  function yj(a, b, c) {
    switch (b.tag) {
      case 3:
        kj(b);
        Ig();
        break;
      case 5:
        Ah(b);
        break;
      case 1:
        Zf(b.type) && cg(b);
        break;
      case 4:
        yh(b, b.stateNode.containerInfo);
        break;
      case 10:
        var d = b.type._context, e = b.memoizedProps.value;
        G(Wg, d._currentValue);
        d._currentValue = e;
        break;
      case 13:
        d = b.memoizedState;
        if (null !== d) {
          if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
          if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
          G(L, L.current & 1);
          a = Zi(a, b, c);
          return null !== a ? a.sibling : null;
        }
        G(L, L.current & 1);
        break;
      case 19:
        d = 0 !== (c & b.childLanes);
        if (0 !== (a.flags & 128)) {
          if (d) return xj(a, b, c);
          b.flags |= 128;
        }
        e = b.memoizedState;
        null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
        G(L, L.current);
        if (d) break;
        else return null;
      case 22:
      case 23:
        return b.lanes = 0, dj(a, b, c);
    }
    return Zi(a, b, c);
  }
  var zj, Aj, Bj, Cj;
  zj = function(a, b) {
    for (var c = b.child; null !== c; ) {
      if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
      else if (4 !== c.tag && null !== c.child) {
        c.child.return = c;
        c = c.child;
        continue;
      }
      if (c === b) break;
      for (; null === c.sibling; ) {
        if (null === c.return || c.return === b) return;
        c = c.return;
      }
      c.sibling.return = c.return;
      c = c.sibling;
    }
  };
  Aj = function() {
  };
  Bj = function(a, b, c, d) {
    var e = a.memoizedProps;
    if (e !== d) {
      a = b.stateNode;
      xh(uh.current);
      var f2 = null;
      switch (c) {
        case "input":
          e = Ya(a, e);
          d = Ya(a, d);
          f2 = [];
          break;
        case "select":
          e = A({}, e, { value: void 0 });
          d = A({}, d, { value: void 0 });
          f2 = [];
          break;
        case "textarea":
          e = gb(a, e);
          d = gb(a, d);
          f2 = [];
          break;
        default:
          "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
      }
      ub(c, d);
      var g;
      c = null;
      for (l2 in e) if (!d.hasOwnProperty(l2) && e.hasOwnProperty(l2) && null != e[l2]) if ("style" === l2) {
        var h = e[l2];
        for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
      } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
      for (l2 in d) {
        var k2 = d[l2];
        h = null != e ? e[l2] : void 0;
        if (d.hasOwnProperty(l2) && k2 !== h && (null != k2 || null != h)) if ("style" === l2) if (h) {
          for (g in h) !h.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
          for (g in k2) k2.hasOwnProperty(g) && h[g] !== k2[g] && (c || (c = {}), c[g] = k2[g]);
        } else c || (f2 || (f2 = []), f2.push(
          l2,
          c
        )), c = k2;
        else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h = h ? h.__html : void 0, null != k2 && h !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D("scroll", a), f2 || h === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
      }
      c && (f2 = f2 || []).push("style", c);
      var l2 = f2;
      if (b.updateQueue = l2) b.flags |= 4;
    }
  };
  Cj = function(a, b, c, d) {
    c !== d && (b.flags |= 4);
  };
  function Dj(a, b) {
    if (!I) switch (a.tailMode) {
      case "hidden":
        b = a.tail;
        for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
        null === c ? a.tail = null : c.sibling = null;
        break;
      case "collapsed":
        c = a.tail;
        for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
        null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
    }
  }
  function S(a) {
    var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
    if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
    else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
    a.subtreeFlags |= d;
    a.childLanes = c;
    return b;
  }
  function Ej(a, b, c) {
    var d = b.pendingProps;
    wg(b);
    switch (b.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return S(b), null;
      case 1:
        return Zf(b.type) && $f(), S(b), null;
      case 3:
        d = b.stateNode;
        zh();
        E(Wf);
        E(H);
        Eh();
        d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
        if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
        Aj(a, b);
        S(b);
        return null;
      case 5:
        Bh(b);
        var e = xh(wh.current);
        c = b.type;
        if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        else {
          if (!d) {
            if (null === b.stateNode) throw Error(p(166));
            S(b);
            return null;
          }
          a = xh(uh.current);
          if (Gg(b)) {
            d = b.stateNode;
            c = b.type;
            var f2 = b.memoizedProps;
            d[Of] = b;
            d[Pf] = f2;
            a = 0 !== (b.mode & 1);
            switch (c) {
              case "dialog":
                D("cancel", d);
                D("close", d);
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", d);
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++) D(lf[e], d);
                break;
              case "source":
                D("error", d);
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  d
                );
                D("load", d);
                break;
              case "details":
                D("toggle", d);
                break;
              case "input":
                Za(d, f2);
                D("invalid", d);
                break;
              case "select":
                d._wrapperState = { wasMultiple: !!f2.multiple };
                D("invalid", d);
                break;
              case "textarea":
                hb(d, f2), D("invalid", d);
            }
            ub(c, f2);
            e = null;
            for (var g in f2) if (f2.hasOwnProperty(g)) {
              var h = f2[g];
              "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
                d.textContent,
                h,
                a
              ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
            }
            switch (c) {
              case "input":
                Va(d);
                db(d, f2, true);
                break;
              case "textarea":
                Va(d);
                jb(d);
                break;
              case "select":
              case "option":
                break;
              default:
                "function" === typeof f2.onClick && (d.onclick = Bf);
            }
            d = e;
            b.updateQueue = d;
            null !== d && (b.flags |= 4);
          } else {
            g = 9 === e.nodeType ? e : e.ownerDocument;
            "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
            "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
            a[Of] = b;
            a[Pf] = d;
            zj(a, b, false, false);
            b.stateNode = a;
            a: {
              g = vb(c, d);
              switch (c) {
                case "dialog":
                  D("cancel", a);
                  D("close", a);
                  e = d;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  D("load", a);
                  e = d;
                  break;
                case "video":
                case "audio":
                  for (e = 0; e < lf.length; e++) D(lf[e], a);
                  e = d;
                  break;
                case "source":
                  D("error", a);
                  e = d;
                  break;
                case "img":
                case "image":
                case "link":
                  D(
                    "error",
                    a
                  );
                  D("load", a);
                  e = d;
                  break;
                case "details":
                  D("toggle", a);
                  e = d;
                  break;
                case "input":
                  Za(a, d);
                  e = Ya(a, d);
                  D("invalid", a);
                  break;
                case "option":
                  e = d;
                  break;
                case "select":
                  a._wrapperState = { wasMultiple: !!d.multiple };
                  e = A({}, d, { value: void 0 });
                  D("invalid", a);
                  break;
                case "textarea":
                  hb(a, d);
                  e = gb(a, d);
                  D("invalid", a);
                  break;
                default:
                  e = d;
              }
              ub(c, e);
              h = e;
              for (f2 in h) if (h.hasOwnProperty(f2)) {
                var k2 = h[f2];
                "style" === f2 ? sb(a, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c || "" !== k2) && ob(a, k2) : "number" === typeof k2 && ob(a, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D("scroll", a) : null != k2 && ta(a, f2, k2, g));
              }
              switch (c) {
                case "input":
                  Va(a);
                  db(a, d, false);
                  break;
                case "textarea":
                  Va(a);
                  jb(a);
                  break;
                case "option":
                  null != d.value && a.setAttribute("value", "" + Sa(d.value));
                  break;
                case "select":
                  a.multiple = !!d.multiple;
                  f2 = d.value;
                  null != f2 ? fb(a, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                    a,
                    !!d.multiple,
                    d.defaultValue,
                    true
                  );
                  break;
                default:
                  "function" === typeof e.onClick && (a.onclick = Bf);
              }
              switch (c) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  d = !!d.autoFocus;
                  break a;
                case "img":
                  d = true;
                  break a;
                default:
                  d = false;
              }
            }
            d && (b.flags |= 4);
          }
          null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        }
        S(b);
        return null;
      case 6:
        if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
        else {
          if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
          c = xh(wh.current);
          xh(uh.current);
          if (Gg(b)) {
            d = b.stateNode;
            c = b.memoizedProps;
            d[Of] = b;
            if (f2 = d.nodeValue !== c) {
              if (a = xg, null !== a) switch (a.tag) {
                case 3:
                  Af(d.nodeValue, c, 0 !== (a.mode & 1));
                  break;
                case 5:
                  true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
              }
            }
            f2 && (b.flags |= 4);
          } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
        }
        S(b);
        return null;
      case 13:
        E(L);
        d = b.memoizedState;
        if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
          if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
          else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
            if (null === a) {
              if (!f2) throw Error(p(318));
              f2 = b.memoizedState;
              f2 = null !== f2 ? f2.dehydrated : null;
              if (!f2) throw Error(p(317));
              f2[Of] = b;
            } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
            S(b);
            f2 = false;
          } else null !== zg && (Fj(zg), zg = null), f2 = true;
          if (!f2) return b.flags & 65536 ? b : null;
        }
        if (0 !== (b.flags & 128)) return b.lanes = c, b;
        d = null !== d;
        d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
        null !== b.updateQueue && (b.flags |= 4);
        S(b);
        return null;
      case 4:
        return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
      case 10:
        return ah(b.type._context), S(b), null;
      case 17:
        return Zf(b.type) && $f(), S(b), null;
      case 19:
        E(L);
        f2 = b.memoizedState;
        if (null === f2) return S(b), null;
        d = 0 !== (b.flags & 128);
        g = f2.rendering;
        if (null === g) if (d) Dj(f2, false);
        else {
          if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
            g = Ch(a);
            if (null !== g) {
              b.flags |= 128;
              Dj(f2, false);
              d = g.updateQueue;
              null !== d && (b.updateQueue = d, b.flags |= 4);
              b.subtreeFlags = 0;
              d = c;
              for (c = b.child; null !== c; ) f2 = c, a = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a = g.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
              G(L, L.current & 1 | 2);
              return b.child;
            }
            a = a.sibling;
          }
          null !== f2.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
        }
        else {
          if (!d) if (a = Ch(g), null !== a) {
            if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I) return S(b), null;
          } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
          f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f2.last, null !== c ? c.sibling = g : b.child = g, f2.last = g);
        }
        if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
        S(b);
        return null;
      case 22:
      case 23:
        return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(p(156, b.tag));
  }
  function Ij(a, b) {
    wg(b);
    switch (b.tag) {
      case 1:
        return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
      case 3:
        return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
      case 5:
        return Bh(b), null;
      case 13:
        E(L);
        a = b.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          if (null === b.alternate) throw Error(p(340));
          Ig();
        }
        a = b.flags;
        return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
      case 19:
        return E(L), null;
      case 4:
        return zh(), null;
      case 10:
        return ah(b.type._context), null;
      case 22:
      case 23:
        return Hj(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
  function Lj(a, b) {
    var c = a.ref;
    if (null !== c) if ("function" === typeof c) try {
      c(null);
    } catch (d) {
      W(a, b, d);
    }
    else c.current = null;
  }
  function Mj(a, b, c) {
    try {
      c();
    } catch (d) {
      W(a, b, d);
    }
  }
  var Nj = false;
  function Oj(a, b) {
    Cf = dd;
    a = Me();
    if (Ne(a)) {
      if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
      else a: {
        c = (c = a.ownerDocument) && c.defaultView || window;
        var d = c.getSelection && c.getSelection();
        if (d && 0 !== d.rangeCount) {
          c = d.anchorNode;
          var e = d.anchorOffset, f2 = d.focusNode;
          d = d.focusOffset;
          try {
            c.nodeType, f2.nodeType;
          } catch (F2) {
            c = null;
            break a;
          }
          var g = 0, h = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
          b: for (; ; ) {
            for (var y2; ; ) {
              q2 !== c || 0 !== e && 3 !== q2.nodeType || (h = g + e);
              q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k2 = g + d);
              3 === q2.nodeType && (g += q2.nodeValue.length);
              if (null === (y2 = q2.firstChild)) break;
              r2 = q2;
              q2 = y2;
            }
            for (; ; ) {
              if (q2 === a) break b;
              r2 === c && ++l2 === e && (h = g);
              r2 === f2 && ++m2 === d && (k2 = g);
              if (null !== (y2 = q2.nextSibling)) break;
              q2 = r2;
              r2 = q2.parentNode;
            }
            q2 = y2;
          }
          c = -1 === h || -1 === k2 ? null : { start: h, end: k2 };
        } else c = null;
      }
      c = c || { start: 0, end: 0 };
    } else c = null;
    Df = { focusedElem: a, selectionRange: c };
    dd = false;
    for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
    else for (; null !== V; ) {
      b = V;
      try {
        var n2 = b.alternate;
        if (0 !== (b.flags & 1024)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (null !== n2) {
              var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
              x2.__reactInternalSnapshotBeforeUpdate = w2;
            }
            break;
          case 3:
            var u2 = b.stateNode.containerInfo;
            1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(p(163));
        }
      } catch (F2) {
        W(b, b.return, F2);
      }
      a = b.sibling;
      if (null !== a) {
        a.return = b.return;
        V = a;
        break;
      }
      V = b.return;
    }
    n2 = Nj;
    Nj = false;
    return n2;
  }
  function Pj(a, b, c) {
    var d = b.updateQueue;
    d = null !== d ? d.lastEffect : null;
    if (null !== d) {
      var e = d = d.next;
      do {
        if ((e.tag & a) === a) {
          var f2 = e.destroy;
          e.destroy = void 0;
          void 0 !== f2 && Mj(b, c, f2);
        }
        e = e.next;
      } while (e !== d);
    }
  }
  function Qj(a, b) {
    b = b.updateQueue;
    b = null !== b ? b.lastEffect : null;
    if (null !== b) {
      var c = b = b.next;
      do {
        if ((c.tag & a) === a) {
          var d = c.create;
          c.destroy = d();
        }
        c = c.next;
      } while (c !== b);
    }
  }
  function Rj(a) {
    var b = a.ref;
    if (null !== b) {
      var c = a.stateNode;
      switch (a.tag) {
        case 5:
          a = c;
          break;
        default:
          a = c;
      }
      "function" === typeof b ? b(a) : b.current = a;
    }
  }
  function Sj(a) {
    var b = a.alternate;
    null !== b && (a.alternate = null, Sj(b));
    a.child = null;
    a.deletions = null;
    a.sibling = null;
    5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
    a.stateNode = null;
    a.return = null;
    a.dependencies = null;
    a.memoizedProps = null;
    a.memoizedState = null;
    a.pendingProps = null;
    a.stateNode = null;
    a.updateQueue = null;
  }
  function Tj(a) {
    return 5 === a.tag || 3 === a.tag || 4 === a.tag;
  }
  function Uj(a) {
    a: for (; ; ) {
      for (; null === a.sibling; ) {
        if (null === a.return || Tj(a.return)) return null;
        a = a.return;
      }
      a.sibling.return = a.return;
      for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
        if (a.flags & 2) continue a;
        if (null === a.child || 4 === a.tag) continue a;
        else a.child.return = a, a = a.child;
      }
      if (!(a.flags & 2)) return a.stateNode;
    }
  }
  function Vj(a, b, c) {
    var d = a.tag;
    if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
    else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
  }
  function Wj(a, b, c) {
    var d = a.tag;
    if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
    else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
  }
  var X = null, Xj = false;
  function Yj(a, b, c) {
    for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
  }
  function Zj(a, b, c) {
    if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
      lc.onCommitFiberUnmount(kc, c);
    } catch (h) {
    }
    switch (c.tag) {
      case 5:
        U || Lj(c, b);
      case 6:
        var d = X, e = Xj;
        X = null;
        Yj(a, b, c);
        X = d;
        Xj = e;
        null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
        break;
      case 18:
        null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
        break;
      case 4:
        d = X;
        e = Xj;
        X = c.stateNode.containerInfo;
        Xj = true;
        Yj(a, b, c);
        X = d;
        Xj = e;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
          e = d = d.next;
          do {
            var f2 = e, g = f2.destroy;
            f2 = f2.tag;
            void 0 !== g && (0 !== (f2 & 2) ? Mj(c, b, g) : 0 !== (f2 & 4) && Mj(c, b, g));
            e = e.next;
          } while (e !== d);
        }
        Yj(a, b, c);
        break;
      case 1:
        if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
          d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
        } catch (h) {
          W(c, b, h);
        }
        Yj(a, b, c);
        break;
      case 21:
        Yj(a, b, c);
        break;
      case 22:
        c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
        break;
      default:
        Yj(a, b, c);
    }
  }
  function ak(a) {
    var b = a.updateQueue;
    if (null !== b) {
      a.updateQueue = null;
      var c = a.stateNode;
      null === c && (c = a.stateNode = new Kj());
      b.forEach(function(b2) {
        var d = bk.bind(null, a, b2);
        c.has(b2) || (c.add(b2), b2.then(d, d));
      });
    }
  }
  function ck(a, b) {
    var c = b.deletions;
    if (null !== c) for (var d = 0; d < c.length; d++) {
      var e = c[d];
      try {
        var f2 = a, g = b, h = g;
        a: for (; null !== h; ) {
          switch (h.tag) {
            case 5:
              X = h.stateNode;
              Xj = false;
              break a;
            case 3:
              X = h.stateNode.containerInfo;
              Xj = true;
              break a;
            case 4:
              X = h.stateNode.containerInfo;
              Xj = true;
              break a;
          }
          h = h.return;
        }
        if (null === X) throw Error(p(160));
        Zj(f2, g, e);
        X = null;
        Xj = false;
        var k2 = e.alternate;
        null !== k2 && (k2.return = null);
        e.return = null;
      } catch (l2) {
        W(e, b, l2);
      }
    }
    if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
  }
  function dk(a, b) {
    var c = a.alternate, d = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ck(b, a);
        ek(a);
        if (d & 4) {
          try {
            Pj(3, a, a.return), Qj(3, a);
          } catch (t2) {
            W(a, a.return, t2);
          }
          try {
            Pj(5, a, a.return);
          } catch (t2) {
            W(a, a.return, t2);
          }
        }
        break;
      case 1:
        ck(b, a);
        ek(a);
        d & 512 && null !== c && Lj(c, c.return);
        break;
      case 5:
        ck(b, a);
        ek(a);
        d & 512 && null !== c && Lj(c, c.return);
        if (a.flags & 32) {
          var e = a.stateNode;
          try {
            ob(e, "");
          } catch (t2) {
            W(a, a.return, t2);
          }
        }
        if (d & 4 && (e = a.stateNode, null != e)) {
          var f2 = a.memoizedProps, g = null !== c ? c.memoizedProps : f2, h = a.type, k2 = a.updateQueue;
          a.updateQueue = null;
          if (null !== k2) try {
            "input" === h && "radio" === f2.type && null != f2.name && ab(e, f2);
            vb(h, g);
            var l2 = vb(h, f2);
            for (g = 0; g < k2.length; g += 2) {
              var m2 = k2[g], q2 = k2[g + 1];
              "style" === m2 ? sb(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e, q2) : "children" === m2 ? ob(e, q2) : ta(e, m2, q2, l2);
            }
            switch (h) {
              case "input":
                bb(e, f2);
                break;
              case "textarea":
                ib(e, f2);
                break;
              case "select":
                var r2 = e._wrapperState.wasMultiple;
                e._wrapperState.wasMultiple = !!f2.multiple;
                var y2 = f2.value;
                null != y2 ? fb(e, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                  e,
                  !!f2.multiple,
                  f2.defaultValue,
                  true
                ) : fb(e, !!f2.multiple, f2.multiple ? [] : "", false));
            }
            e[Pf] = f2;
          } catch (t2) {
            W(a, a.return, t2);
          }
        }
        break;
      case 6:
        ck(b, a);
        ek(a);
        if (d & 4) {
          if (null === a.stateNode) throw Error(p(162));
          e = a.stateNode;
          f2 = a.memoizedProps;
          try {
            e.nodeValue = f2;
          } catch (t2) {
            W(a, a.return, t2);
          }
        }
        break;
      case 3:
        ck(b, a);
        ek(a);
        if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
          bd(b.containerInfo);
        } catch (t2) {
          W(a, a.return, t2);
        }
        break;
      case 4:
        ck(b, a);
        ek(a);
        break;
      case 13:
        ck(b, a);
        ek(a);
        e = a.child;
        e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
        d & 4 && ak(a);
        break;
      case 22:
        m2 = null !== c && null !== c.memoizedState;
        a.mode & 1 ? (U = (l2 = U) || m2, ck(b, a), U = l2) : ck(b, a);
        ek(a);
        if (d & 8192) {
          l2 = null !== a.memoizedState;
          if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1)) for (V = a, m2 = a.child; null !== m2; ) {
            for (q2 = V = m2; null !== V; ) {
              r2 = V;
              y2 = r2.child;
              switch (r2.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Pj(4, r2, r2.return);
                  break;
                case 1:
                  Lj(r2, r2.return);
                  var n2 = r2.stateNode;
                  if ("function" === typeof n2.componentWillUnmount) {
                    d = r2;
                    c = r2.return;
                    try {
                      b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                    } catch (t2) {
                      W(d, c, t2);
                    }
                  }
                  break;
                case 5:
                  Lj(r2, r2.return);
                  break;
                case 22:
                  if (null !== r2.memoizedState) {
                    gk(q2);
                    continue;
                  }
              }
              null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
            }
            m2 = m2.sibling;
          }
          a: for (m2 = null, q2 = a; ; ) {
            if (5 === q2.tag) {
              if (null === m2) {
                m2 = q2;
                try {
                  e = q2.stateNode, l2 ? (f2 = e.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k2 = q2.memoizedProps.style, g = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h.style.display = rb("display", g));
                } catch (t2) {
                  W(a, a.return, t2);
                }
              }
            } else if (6 === q2.tag) {
              if (null === m2) try {
                q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
              } catch (t2) {
                W(a, a.return, t2);
              }
            } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
              q2.child.return = q2;
              q2 = q2.child;
              continue;
            }
            if (q2 === a) break a;
            for (; null === q2.sibling; ) {
              if (null === q2.return || q2.return === a) break a;
              m2 === q2 && (m2 = null);
              q2 = q2.return;
            }
            m2 === q2 && (m2 = null);
            q2.sibling.return = q2.return;
            q2 = q2.sibling;
          }
        }
        break;
      case 19:
        ck(b, a);
        ek(a);
        d & 4 && ak(a);
        break;
      case 21:
        break;
      default:
        ck(
          b,
          a
        ), ek(a);
    }
  }
  function ek(a) {
    var b = a.flags;
    if (b & 2) {
      try {
        a: {
          for (var c = a.return; null !== c; ) {
            if (Tj(c)) {
              var d = c;
              break a;
            }
            c = c.return;
          }
          throw Error(p(160));
        }
        switch (d.tag) {
          case 5:
            var e = d.stateNode;
            d.flags & 32 && (ob(e, ""), d.flags &= -33);
            var f2 = Uj(a);
            Wj(a, f2, e);
            break;
          case 3:
          case 4:
            var g = d.stateNode.containerInfo, h = Uj(a);
            Vj(a, h, g);
            break;
          default:
            throw Error(p(161));
        }
      } catch (k2) {
        W(a, a.return, k2);
      }
      a.flags &= -3;
    }
    b & 4096 && (a.flags &= -4097);
  }
  function hk(a, b, c) {
    V = a;
    ik(a);
  }
  function ik(a, b, c) {
    for (var d = 0 !== (a.mode & 1); null !== V; ) {
      var e = V, f2 = e.child;
      if (22 === e.tag && d) {
        var g = null !== e.memoizedState || Jj;
        if (!g) {
          var h = e.alternate, k2 = null !== h && null !== h.memoizedState || U;
          h = Jj;
          var l2 = U;
          Jj = g;
          if ((U = k2) && !l2) for (V = e; null !== V; ) g = V, k2 = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k2 ? (k2.return = g, V = k2) : jk(e);
          for (; null !== f2; ) V = f2, ik(f2), f2 = f2.sibling;
          V = e;
          Jj = h;
          U = l2;
        }
        kk(a);
      } else 0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, V = f2) : kk(a);
    }
  }
  function kk(a) {
    for (; null !== V; ) {
      var b = V;
      if (0 !== (b.flags & 8772)) {
        var c = b.alternate;
        try {
          if (0 !== (b.flags & 8772)) switch (b.tag) {
            case 0:
            case 11:
            case 15:
              U || Qj(5, b);
              break;
            case 1:
              var d = b.stateNode;
              if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
              else {
                var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
              }
              var f2 = b.updateQueue;
              null !== f2 && sh(b, f2, d);
              break;
            case 3:
              var g = b.updateQueue;
              if (null !== g) {
                c = null;
                if (null !== b.child) switch (b.child.tag) {
                  case 5:
                    c = b.child.stateNode;
                    break;
                  case 1:
                    c = b.child.stateNode;
                }
                sh(b, g, c);
              }
              break;
            case 5:
              var h = b.stateNode;
              if (null === c && b.flags & 4) {
                c = h;
                var k2 = b.memoizedProps;
                switch (b.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    k2.autoFocus && c.focus();
                    break;
                  case "img":
                    k2.src && (c.src = k2.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (null === b.memoizedState) {
                var l2 = b.alternate;
                if (null !== l2) {
                  var m2 = l2.memoizedState;
                  if (null !== m2) {
                    var q2 = m2.dehydrated;
                    null !== q2 && bd(q2);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(p(163));
          }
          U || b.flags & 512 && Rj(b);
        } catch (r2) {
          W(b, b.return, r2);
        }
      }
      if (b === a) {
        V = null;
        break;
      }
      c = b.sibling;
      if (null !== c) {
        c.return = b.return;
        V = c;
        break;
      }
      V = b.return;
    }
  }
  function gk(a) {
    for (; null !== V; ) {
      var b = V;
      if (b === a) {
        V = null;
        break;
      }
      var c = b.sibling;
      if (null !== c) {
        c.return = b.return;
        V = c;
        break;
      }
      V = b.return;
    }
  }
  function jk(a) {
    for (; null !== V; ) {
      var b = V;
      try {
        switch (b.tag) {
          case 0:
          case 11:
          case 15:
            var c = b.return;
            try {
              Qj(4, b);
            } catch (k2) {
              W(b, c, k2);
            }
            break;
          case 1:
            var d = b.stateNode;
            if ("function" === typeof d.componentDidMount) {
              var e = b.return;
              try {
                d.componentDidMount();
              } catch (k2) {
                W(b, e, k2);
              }
            }
            var f2 = b.return;
            try {
              Rj(b);
            } catch (k2) {
              W(b, f2, k2);
            }
            break;
          case 5:
            var g = b.return;
            try {
              Rj(b);
            } catch (k2) {
              W(b, g, k2);
            }
        }
      } catch (k2) {
        W(b, b.return, k2);
      }
      if (b === a) {
        V = null;
        break;
      }
      var h = b.sibling;
      if (null !== h) {
        h.return = b.return;
        V = h;
        break;
      }
      V = b.return;
    }
  }
  var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
  function R() {
    return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
  }
  function yi(a) {
    if (0 === (a.mode & 1)) return 1;
    if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
    if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
    a = C;
    if (0 !== a) return a;
    a = window.event;
    a = void 0 === a ? 16 : jd(a.type);
    return a;
  }
  function gi(a, b, c, d) {
    if (50 < yk) throw yk = 0, zk = null, Error(p(185));
    Ac(a, c, d);
    if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
  }
  function Dk(a, b) {
    var c = a.callbackNode;
    wc(a, b);
    var d = uc(a, a === Q ? Z : 0);
    if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
    else if (b = d & -d, a.callbackPriority !== b) {
      null != c && bc(c);
      if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
        0 === (K & 6) && jg();
      }), c = null;
      else {
        switch (Dc(d)) {
          case 1:
            c = fc;
            break;
          case 4:
            c = gc;
            break;
          case 16:
            c = hc;
            break;
          case 536870912:
            c = jc;
            break;
          default:
            c = hc;
        }
        c = Fk(c, Gk.bind(null, a));
      }
      a.callbackPriority = b;
      a.callbackNode = c;
    }
  }
  function Gk(a, b) {
    Ak = -1;
    Bk = 0;
    if (0 !== (K & 6)) throw Error(p(327));
    var c = a.callbackNode;
    if (Hk() && a.callbackNode !== c) return null;
    var d = uc(a, a === Q ? Z : 0);
    if (0 === d) return null;
    if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
    else {
      b = d;
      var e = K;
      K |= 2;
      var f2 = Jk();
      if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
      do
        try {
          Lk();
          break;
        } catch (h) {
          Mk(a, h);
        }
      while (1);
      $g();
      mk.current = f2;
      K = e;
      null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
    }
    if (0 !== b) {
      2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
      if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
      if (6 === b) Ck(a, d);
      else {
        e = a.current.alternate;
        if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f2 = xc(a), 0 !== f2 && (d = f2, b = Nk(a, f2))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
        a.finishedWork = e;
        a.finishedLanes = d;
        switch (b) {
          case 0:
          case 1:
            throw Error(p(345));
          case 2:
            Pk(a, tk, uk);
            break;
          case 3:
            Ck(a, d);
            if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
              if (0 !== uc(a, 0)) break;
              e = a.suspendedLanes;
              if ((e & d) !== d) {
                R();
                a.pingedLanes |= a.suspendedLanes & e;
                break;
              }
              a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
              break;
            }
            Pk(a, tk, uk);
            break;
          case 4:
            Ck(a, d);
            if ((d & 4194240) === d) break;
            b = a.eventTimes;
            for (e = -1; 0 < d; ) {
              var g = 31 - oc(d);
              f2 = 1 << g;
              g = b[g];
              g > e && (e = g);
              d &= ~f2;
            }
            d = e;
            d = B() - d;
            d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
            if (10 < d) {
              a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
              break;
            }
            Pk(a, tk, uk);
            break;
          case 5:
            Pk(a, tk, uk);
            break;
          default:
            throw Error(p(329));
        }
      }
    }
    Dk(a, B());
    return a.callbackNode === c ? Gk.bind(null, a) : null;
  }
  function Nk(a, b) {
    var c = sk;
    a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
    a = Ik(a, b);
    2 !== a && (b = tk, tk = c, null !== b && Fj(b));
    return a;
  }
  function Fj(a) {
    null === tk ? tk = a : tk.push.apply(tk, a);
  }
  function Ok(a) {
    for (var b = a; ; ) {
      if (b.flags & 16384) {
        var c = b.updateQueue;
        if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
          var e = c[d], f2 = e.getSnapshot;
          e = e.value;
          try {
            if (!He(f2(), e)) return false;
          } catch (g) {
            return false;
          }
        }
      }
      c = b.child;
      if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
      else {
        if (b === a) break;
        for (; null === b.sibling; ) {
          if (null === b.return || b.return === a) return true;
          b = b.return;
        }
        b.sibling.return = b.return;
        b = b.sibling;
      }
    }
    return true;
  }
  function Ck(a, b) {
    b &= ~rk;
    b &= ~qk;
    a.suspendedLanes |= b;
    a.pingedLanes &= ~b;
    for (a = a.expirationTimes; 0 < b; ) {
      var c = 31 - oc(b), d = 1 << c;
      a[c] = -1;
      b &= ~d;
    }
  }
  function Ek(a) {
    if (0 !== (K & 6)) throw Error(p(327));
    Hk();
    var b = uc(a, 0);
    if (0 === (b & 1)) return Dk(a, B()), null;
    var c = Ik(a, b);
    if (0 !== a.tag && 2 === c) {
      var d = xc(a);
      0 !== d && (b = d, c = Nk(a, d));
    }
    if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
    if (6 === c) throw Error(p(345));
    a.finishedWork = a.current.alternate;
    a.finishedLanes = b;
    Pk(a, tk, uk);
    Dk(a, B());
    return null;
  }
  function Qk(a, b) {
    var c = K;
    K |= 1;
    try {
      return a(b);
    } finally {
      K = c, 0 === K && (Gj = B() + 500, fg && jg());
    }
  }
  function Rk(a) {
    null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
    var b = K;
    K |= 1;
    var c = ok.transition, d = C;
    try {
      if (ok.transition = null, C = 1, a) return a();
    } finally {
      C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
    }
  }
  function Hj() {
    fj = ej.current;
    E(ej);
  }
  function Kk(a, b) {
    a.finishedWork = null;
    a.finishedLanes = 0;
    var c = a.timeoutHandle;
    -1 !== c && (a.timeoutHandle = -1, Gf(c));
    if (null !== Y) for (c = Y.return; null !== c; ) {
      var d = c;
      wg(d);
      switch (d.tag) {
        case 1:
          d = d.type.childContextTypes;
          null !== d && void 0 !== d && $f();
          break;
        case 3:
          zh();
          E(Wf);
          E(H);
          Eh();
          break;
        case 5:
          Bh(d);
          break;
        case 4:
          zh();
          break;
        case 13:
          E(L);
          break;
        case 19:
          E(L);
          break;
        case 10:
          ah(d.type._context);
          break;
        case 22:
        case 23:
          Hj();
      }
      c = c.return;
    }
    Q = a;
    Y = a = Pg(a.current, null);
    Z = fj = b;
    T = 0;
    pk = null;
    rk = qk = rh = 0;
    tk = sk = null;
    if (null !== fh) {
      for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
        c.interleaved = null;
        var e = d.next, f2 = c.pending;
        if (null !== f2) {
          var g = f2.next;
          f2.next = e;
          d.next = g;
        }
        c.pending = d;
      }
      fh = null;
    }
    return a;
  }
  function Mk(a, b) {
    do {
      var c = Y;
      try {
        $g();
        Fh.current = Rh;
        if (Ih) {
          for (var d = M.memoizedState; null !== d; ) {
            var e = d.queue;
            null !== e && (e.pending = null);
            d = d.next;
          }
          Ih = false;
        }
        Hh = 0;
        O = N = M = null;
        Jh = false;
        Kh = 0;
        nk.current = null;
        if (null === c || null === c.return) {
          T = 1;
          pk = b;
          Y = null;
          break;
        }
        a: {
          var f2 = a, g = c.return, h = c, k2 = b;
          b = Z;
          h.flags |= 32768;
          if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
            var l2 = k2, m2 = h, q2 = m2.tag;
            if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
              var r2 = m2.alternate;
              r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
            }
            var y2 = Ui(g);
            if (null !== y2) {
              y2.flags &= -257;
              Vi(y2, g, h, f2, b);
              y2.mode & 1 && Si(f2, l2, b);
              b = y2;
              k2 = l2;
              var n2 = b.updateQueue;
              if (null === n2) {
                var t2 = /* @__PURE__ */ new Set();
                t2.add(k2);
                b.updateQueue = t2;
              } else n2.add(k2);
              break a;
            } else {
              if (0 === (b & 1)) {
                Si(f2, l2, b);
                tj();
                break a;
              }
              k2 = Error(p(426));
            }
          } else if (I && h.mode & 1) {
            var J2 = Ui(g);
            if (null !== J2) {
              0 === (J2.flags & 65536) && (J2.flags |= 256);
              Vi(J2, g, h, f2, b);
              Jg(Ji(k2, h));
              break a;
            }
          }
          f2 = k2 = Ji(k2, h);
          4 !== T && (T = 2);
          null === sk ? sk = [f2] : sk.push(f2);
          f2 = g;
          do {
            switch (f2.tag) {
              case 3:
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var x2 = Ni(f2, k2, b);
                ph(f2, x2);
                break a;
              case 1:
                h = k2;
                var w2 = f2.type, u2 = f2.stateNode;
                if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                  f2.flags |= 65536;
                  b &= -b;
                  f2.lanes |= b;
                  var F2 = Qi(f2, h, b);
                  ph(f2, F2);
                  break a;
                }
            }
            f2 = f2.return;
          } while (null !== f2);
        }
        Sk(c);
      } catch (na) {
        b = na;
        Y === c && null !== c && (Y = c = c.return);
        continue;
      }
      break;
    } while (1);
  }
  function Jk() {
    var a = mk.current;
    mk.current = Rh;
    return null === a ? Rh : a;
  }
  function tj() {
    if (0 === T || 3 === T || 2 === T) T = 4;
    null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
  }
  function Ik(a, b) {
    var c = K;
    K |= 2;
    var d = Jk();
    if (Q !== a || Z !== b) uk = null, Kk(a, b);
    do
      try {
        Tk();
        break;
      } catch (e) {
        Mk(a, e);
      }
    while (1);
    $g();
    K = c;
    mk.current = d;
    if (null !== Y) throw Error(p(261));
    Q = null;
    Z = 0;
    return T;
  }
  function Tk() {
    for (; null !== Y; ) Uk(Y);
  }
  function Lk() {
    for (; null !== Y && !cc(); ) Uk(Y);
  }
  function Uk(a) {
    var b = Vk(a.alternate, a, fj);
    a.memoizedProps = a.pendingProps;
    null === b ? Sk(a) : Y = b;
    nk.current = null;
  }
  function Sk(a) {
    var b = a;
    do {
      var c = b.alternate;
      a = b.return;
      if (0 === (b.flags & 32768)) {
        if (c = Ej(c, b, fj), null !== c) {
          Y = c;
          return;
        }
      } else {
        c = Ij(c, b);
        if (null !== c) {
          c.flags &= 32767;
          Y = c;
          return;
        }
        if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
        else {
          T = 6;
          Y = null;
          return;
        }
      }
      b = b.sibling;
      if (null !== b) {
        Y = b;
        return;
      }
      Y = b = a;
    } while (null !== b);
    0 === T && (T = 5);
  }
  function Pk(a, b, c) {
    var d = C, e = ok.transition;
    try {
      ok.transition = null, C = 1, Wk(a, b, c, d);
    } finally {
      ok.transition = e, C = d;
    }
    return null;
  }
  function Wk(a, b, c, d) {
    do
      Hk();
    while (null !== wk);
    if (0 !== (K & 6)) throw Error(p(327));
    c = a.finishedWork;
    var e = a.finishedLanes;
    if (null === c) return null;
    a.finishedWork = null;
    a.finishedLanes = 0;
    if (c === a.current) throw Error(p(177));
    a.callbackNode = null;
    a.callbackPriority = 0;
    var f2 = c.lanes | c.childLanes;
    Bc(a, f2);
    a === Q && (Y = Q = null, Z = 0);
    0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
      Hk();
      return null;
    }));
    f2 = 0 !== (c.flags & 15990);
    if (0 !== (c.subtreeFlags & 15990) || f2) {
      f2 = ok.transition;
      ok.transition = null;
      var g = C;
      C = 1;
      var h = K;
      K |= 4;
      nk.current = null;
      Oj(a, c);
      dk(c, a);
      Oe(Df);
      dd = !!Cf;
      Df = Cf = null;
      a.current = c;
      hk(c);
      dc();
      K = h;
      C = g;
      ok.transition = f2;
    } else a.current = c;
    vk && (vk = false, wk = a, xk = e);
    f2 = a.pendingLanes;
    0 === f2 && (Ri = null);
    mc(c.stateNode);
    Dk(a, B());
    if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
    if (Oi) throw Oi = false, a = Pi, Pi = null, a;
    0 !== (xk & 1) && 0 !== a.tag && Hk();
    f2 = a.pendingLanes;
    0 !== (f2 & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
    jg();
    return null;
  }
  function Hk() {
    if (null !== wk) {
      var a = Dc(xk), b = ok.transition, c = C;
      try {
        ok.transition = null;
        C = 16 > a ? 16 : a;
        if (null === wk) var d = false;
        else {
          a = wk;
          wk = null;
          xk = 0;
          if (0 !== (K & 6)) throw Error(p(331));
          var e = K;
          K |= 4;
          for (V = a.current; null !== V; ) {
            var f2 = V, g = f2.child;
            if (0 !== (V.flags & 16)) {
              var h = f2.deletions;
              if (null !== h) {
                for (var k2 = 0; k2 < h.length; k2++) {
                  var l2 = h[k2];
                  for (V = l2; null !== V; ) {
                    var m2 = V;
                    switch (m2.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Pj(8, m2, f2);
                    }
                    var q2 = m2.child;
                    if (null !== q2) q2.return = m2, V = q2;
                    else for (; null !== V; ) {
                      m2 = V;
                      var r2 = m2.sibling, y2 = m2.return;
                      Sj(m2);
                      if (m2 === l2) {
                        V = null;
                        break;
                      }
                      if (null !== r2) {
                        r2.return = y2;
                        V = r2;
                        break;
                      }
                      V = y2;
                    }
                  }
                }
                var n2 = f2.alternate;
                if (null !== n2) {
                  var t2 = n2.child;
                  if (null !== t2) {
                    n2.child = null;
                    do {
                      var J2 = t2.sibling;
                      t2.sibling = null;
                      t2 = J2;
                    } while (null !== t2);
                  }
                }
                V = f2;
              }
            }
            if (0 !== (f2.subtreeFlags & 2064) && null !== g) g.return = f2, V = g;
            else b: for (; null !== V; ) {
              f2 = V;
              if (0 !== (f2.flags & 2048)) switch (f2.tag) {
                case 0:
                case 11:
                case 15:
                  Pj(9, f2, f2.return);
              }
              var x2 = f2.sibling;
              if (null !== x2) {
                x2.return = f2.return;
                V = x2;
                break b;
              }
              V = f2.return;
            }
          }
          var w2 = a.current;
          for (V = w2; null !== V; ) {
            g = V;
            var u2 = g.child;
            if (0 !== (g.subtreeFlags & 2064) && null !== u2) u2.return = g, V = u2;
            else b: for (g = w2; null !== V; ) {
              h = V;
              if (0 !== (h.flags & 2048)) try {
                switch (h.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Qj(9, h);
                }
              } catch (na) {
                W(h, h.return, na);
              }
              if (h === g) {
                V = null;
                break b;
              }
              var F2 = h.sibling;
              if (null !== F2) {
                F2.return = h.return;
                V = F2;
                break b;
              }
              V = h.return;
            }
          }
          K = e;
          jg();
          if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
            lc.onPostCommitFiberRoot(kc, a);
          } catch (na) {
          }
          d = true;
        }
        return d;
      } finally {
        C = c, ok.transition = b;
      }
    }
    return false;
  }
  function Xk(a, b, c) {
    b = Ji(c, b);
    b = Ni(a, b, 1);
    a = nh(a, b, 1);
    b = R();
    null !== a && (Ac(a, 1, b), Dk(a, b));
  }
  function W(a, b, c) {
    if (3 === a.tag) Xk(a, a, c);
    else for (; null !== b; ) {
      if (3 === b.tag) {
        Xk(b, a, c);
        break;
      } else if (1 === b.tag) {
        var d = b.stateNode;
        if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
          a = Ji(c, a);
          a = Qi(b, a, 1);
          b = nh(b, a, 1);
          a = R();
          null !== b && (Ac(b, 1, a), Dk(b, a));
          break;
        }
      }
      b = b.return;
    }
  }
  function Ti(a, b, c) {
    var d = a.pingCache;
    null !== d && d.delete(b);
    b = R();
    a.pingedLanes |= a.suspendedLanes & c;
    Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
    Dk(a, b);
  }
  function Yk(a, b) {
    0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
    var c = R();
    a = ih(a, b);
    null !== a && (Ac(a, b, c), Dk(a, c));
  }
  function uj(a) {
    var b = a.memoizedState, c = 0;
    null !== b && (c = b.retryLane);
    Yk(a, c);
  }
  function bk(a, b) {
    var c = 0;
    switch (a.tag) {
      case 13:
        var d = a.stateNode;
        var e = a.memoizedState;
        null !== e && (c = e.retryLane);
        break;
      case 19:
        d = a.stateNode;
        break;
      default:
        throw Error(p(314));
    }
    null !== d && d.delete(b);
    Yk(a, c);
  }
  var Vk;
  Vk = function(a, b, c) {
    if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
    else {
      if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
      dh = 0 !== (a.flags & 131072) ? true : false;
    }
    else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
    b.lanes = 0;
    switch (b.tag) {
      case 2:
        var d = b.type;
        ij(a, b);
        a = b.pendingProps;
        var e = Yf(b, H.current);
        ch(b, c);
        e = Nh(null, b, d, a, e, c);
        var f2 = Sh();
        b.flags |= 1;
        "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f2, c)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e, c), b = b.child);
        return b;
      case 16:
        d = b.elementType;
        a: {
          ij(a, b);
          a = b.pendingProps;
          e = d._init;
          d = e(d._payload);
          b.type = d;
          e = b.tag = Zk(d);
          a = Ci(d, a);
          switch (e) {
            case 0:
              b = cj(null, b, d, a, c);
              break a;
            case 1:
              b = hj(null, b, d, a, c);
              break a;
            case 11:
              b = Yi(null, b, d, a, c);
              break a;
            case 14:
              b = $i(null, b, d, Ci(d.type, a), c);
              break a;
          }
          throw Error(p(
            306,
            d,
            ""
          ));
        }
        return b;
      case 0:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
      case 1:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
      case 3:
        a: {
          kj(b);
          if (null === a) throw Error(p(387));
          d = b.pendingProps;
          f2 = b.memoizedState;
          e = f2.element;
          lh(a, b);
          qh(b, d, null, c);
          var g = b.memoizedState;
          d = g.element;
          if (f2.isDehydrated) if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
            e = Ji(Error(p(423)), b);
            b = lj(a, b, d, c, e);
            break a;
          } else if (d !== e) {
            e = Ji(Error(p(424)), b);
            b = lj(a, b, d, c, e);
            break a;
          } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
          else {
            Ig();
            if (d === e) {
              b = Zi(a, b, c);
              break a;
            }
            Xi(a, b, d, c);
          }
          b = b.child;
        }
        return b;
      case 5:
        return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f2 = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
      case 6:
        return null === a && Eg(b), null;
      case 13:
        return oj(a, b, c);
      case 4:
        return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
      case 11:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
      case 7:
        return Xi(a, b, b.pendingProps, c), b.child;
      case 8:
        return Xi(a, b, b.pendingProps.children, c), b.child;
      case 12:
        return Xi(a, b, b.pendingProps.children, c), b.child;
      case 10:
        a: {
          d = b.type._context;
          e = b.pendingProps;
          f2 = b.memoizedProps;
          g = e.value;
          G(Wg, d._currentValue);
          d._currentValue = g;
          if (null !== f2) if (He(f2.value, g)) {
            if (f2.children === e.children && !Wf.current) {
              b = Zi(a, b, c);
              break a;
            }
          } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
            var h = f2.dependencies;
            if (null !== h) {
              g = f2.child;
              for (var k2 = h.firstContext; null !== k2; ) {
                if (k2.context === d) {
                  if (1 === f2.tag) {
                    k2 = mh(-1, c & -c);
                    k2.tag = 2;
                    var l2 = f2.updateQueue;
                    if (null !== l2) {
                      l2 = l2.shared;
                      var m2 = l2.pending;
                      null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                      l2.pending = k2;
                    }
                  }
                  f2.lanes |= c;
                  k2 = f2.alternate;
                  null !== k2 && (k2.lanes |= c);
                  bh(
                    f2.return,
                    c,
                    b
                  );
                  h.lanes |= c;
                  break;
                }
                k2 = k2.next;
              }
            } else if (10 === f2.tag) g = f2.type === b.type ? null : f2.child;
            else if (18 === f2.tag) {
              g = f2.return;
              if (null === g) throw Error(p(341));
              g.lanes |= c;
              h = g.alternate;
              null !== h && (h.lanes |= c);
              bh(g, c, b);
              g = f2.sibling;
            } else g = f2.child;
            if (null !== g) g.return = f2;
            else for (g = f2; null !== g; ) {
              if (g === b) {
                g = null;
                break;
              }
              f2 = g.sibling;
              if (null !== f2) {
                f2.return = g.return;
                g = f2;
                break;
              }
              g = g.return;
            }
            f2 = g;
          }
          Xi(a, b, e.children, c);
          b = b.child;
        }
        return b;
      case 9:
        return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
      case 14:
        return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
      case 15:
        return bj(a, b, b.type, b.pendingProps, c);
      case 17:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
      case 19:
        return xj(a, b, c);
      case 22:
        return dj(a, b, c);
    }
    throw Error(p(156, b.tag));
  };
  function Fk(a, b) {
    return ac(a, b);
  }
  function $k(a, b, c, d) {
    this.tag = a;
    this.key = c;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.ref = null;
    this.pendingProps = b;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = d;
    this.subtreeFlags = this.flags = 0;
    this.deletions = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function Bg(a, b, c, d) {
    return new $k(a, b, c, d);
  }
  function aj(a) {
    a = a.prototype;
    return !(!a || !a.isReactComponent);
  }
  function Zk(a) {
    if ("function" === typeof a) return aj(a) ? 1 : 0;
    if (void 0 !== a && null !== a) {
      a = a.$$typeof;
      if (a === Da) return 11;
      if (a === Ga) return 14;
    }
    return 2;
  }
  function Pg(a, b) {
    var c = a.alternate;
    null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
    c.flags = a.flags & 14680064;
    c.childLanes = a.childLanes;
    c.lanes = a.lanes;
    c.child = a.child;
    c.memoizedProps = a.memoizedProps;
    c.memoizedState = a.memoizedState;
    c.updateQueue = a.updateQueue;
    b = a.dependencies;
    c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
    c.sibling = a.sibling;
    c.index = a.index;
    c.ref = a.ref;
    return c;
  }
  function Rg(a, b, c, d, e, f2) {
    var g = 2;
    d = a;
    if ("function" === typeof a) aj(a) && (g = 1);
    else if ("string" === typeof a) g = 5;
    else a: switch (a) {
      case ya:
        return Tg(c.children, e, f2, b);
      case za:
        g = 8;
        e |= 8;
        break;
      case Aa:
        return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f2, a;
      case Ea:
        return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f2, a;
      case Fa:
        return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f2, a;
      case Ia:
        return pj(c, e, f2, b);
      default:
        if ("object" === typeof a && null !== a) switch (a.$$typeof) {
          case Ba:
            g = 10;
            break a;
          case Ca:
            g = 9;
            break a;
          case Da:
            g = 11;
            break a;
          case Ga:
            g = 14;
            break a;
          case Ha:
            g = 16;
            d = null;
            break a;
        }
        throw Error(p(130, null == a ? a : typeof a, ""));
    }
    b = Bg(g, c, b, e);
    b.elementType = a;
    b.type = d;
    b.lanes = f2;
    return b;
  }
  function Tg(a, b, c, d) {
    a = Bg(7, a, d, b);
    a.lanes = c;
    return a;
  }
  function pj(a, b, c, d) {
    a = Bg(22, a, d, b);
    a.elementType = Ia;
    a.lanes = c;
    a.stateNode = { isHidden: false };
    return a;
  }
  function Qg(a, b, c) {
    a = Bg(6, a, null, b);
    a.lanes = c;
    return a;
  }
  function Sg(a, b, c) {
    b = Bg(4, null !== a.children ? a.children : [], a.key, b);
    b.lanes = c;
    b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
    return b;
  }
  function al(a, b, c, d, e) {
    this.tag = b;
    this.containerInfo = a;
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = -1;
    this.callbackNode = this.pendingContext = this.context = null;
    this.callbackPriority = 0;
    this.eventTimes = zc(0);
    this.expirationTimes = zc(-1);
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = zc(0);
    this.identifierPrefix = d;
    this.onRecoverableError = e;
    this.mutableSourceEagerHydrationData = null;
  }
  function bl(a, b, c, d, e, f2, g, h, k2) {
    a = new al(a, b, c, h, k2);
    1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
    f2 = Bg(3, null, null, b);
    a.current = f2;
    f2.stateNode = a;
    f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
    kh(f2);
    return a;
  }
  function cl(a, b, c) {
    var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
  }
  function dl(a) {
    if (!a) return Vf;
    a = a._reactInternals;
    a: {
      if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
      var b = a;
      do {
        switch (b.tag) {
          case 3:
            b = b.stateNode.context;
            break a;
          case 1:
            if (Zf(b.type)) {
              b = b.stateNode.__reactInternalMemoizedMergedChildContext;
              break a;
            }
        }
        b = b.return;
      } while (null !== b);
      throw Error(p(171));
    }
    if (1 === a.tag) {
      var c = a.type;
      if (Zf(c)) return bg(a, c, b);
    }
    return b;
  }
  function el(a, b, c, d, e, f2, g, h, k2) {
    a = bl(c, d, true, a, e, f2, g, h, k2);
    a.context = dl(null);
    c = a.current;
    d = R();
    e = yi(c);
    f2 = mh(d, e);
    f2.callback = void 0 !== b && null !== b ? b : null;
    nh(c, f2, e);
    a.current.lanes = e;
    Ac(a, e, d);
    Dk(a, d);
    return a;
  }
  function fl(a, b, c, d) {
    var e = b.current, f2 = R(), g = yi(e);
    c = dl(c);
    null === b.context ? b.context = c : b.pendingContext = c;
    b = mh(f2, g);
    b.payload = { element: a };
    d = void 0 === d ? null : d;
    null !== d && (b.callback = d);
    a = nh(e, b, g);
    null !== a && (gi(a, e, g, f2), oh(a, e, g));
    return g;
  }
  function gl(a) {
    a = a.current;
    if (!a.child) return null;
    switch (a.child.tag) {
      case 5:
        return a.child.stateNode;
      default:
        return a.child.stateNode;
    }
  }
  function hl(a, b) {
    a = a.memoizedState;
    if (null !== a && null !== a.dehydrated) {
      var c = a.retryLane;
      a.retryLane = 0 !== c && c < b ? c : b;
    }
  }
  function il(a, b) {
    hl(a, b);
    (a = a.alternate) && hl(a, b);
  }
  function jl() {
    return null;
  }
  var kl = "function" === typeof reportError ? reportError : function(a) {
    console.error(a);
  };
  function ll(a) {
    this._internalRoot = a;
  }
  ml.prototype.render = ll.prototype.render = function(a) {
    var b = this._internalRoot;
    if (null === b) throw Error(p(409));
    fl(a, b, null, null);
  };
  ml.prototype.unmount = ll.prototype.unmount = function() {
    var a = this._internalRoot;
    if (null !== a) {
      this._internalRoot = null;
      var b = a.containerInfo;
      Rk(function() {
        fl(null, a, null, null);
      });
      b[uf] = null;
    }
  };
  function ml(a) {
    this._internalRoot = a;
  }
  ml.prototype.unstable_scheduleHydration = function(a) {
    if (a) {
      var b = Hc();
      a = { blockedOn: null, target: a, priority: b };
      for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
      Qc.splice(c, 0, a);
      0 === c && Vc(a);
    }
  };
  function nl(a) {
    return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
  }
  function ol(a) {
    return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
  }
  function pl() {
  }
  function ql(a, b, c, d, e) {
    if (e) {
      if ("function" === typeof d) {
        var f2 = d;
        d = function() {
          var a2 = gl(g);
          f2.call(a2);
        };
      }
      var g = el(b, d, a, 0, null, false, false, "", pl);
      a._reactRootContainer = g;
      a[uf] = g.current;
      sf(8 === a.nodeType ? a.parentNode : a);
      Rk();
      return g;
    }
    for (; e = a.lastChild; ) a.removeChild(e);
    if ("function" === typeof d) {
      var h = d;
      d = function() {
        var a2 = gl(k2);
        h.call(a2);
      };
    }
    var k2 = bl(a, 0, false, null, null, false, false, "", pl);
    a._reactRootContainer = k2;
    a[uf] = k2.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk(function() {
      fl(b, k2, c, d);
    });
    return k2;
  }
  function rl(a, b, c, d, e) {
    var f2 = c._reactRootContainer;
    if (f2) {
      var g = f2;
      if ("function" === typeof e) {
        var h = e;
        e = function() {
          var a2 = gl(g);
          h.call(a2);
        };
      }
      fl(b, g, a, e);
    } else g = ql(c, b, a, e, d);
    return gl(g);
  }
  Ec = function(a) {
    switch (a.tag) {
      case 3:
        var b = a.stateNode;
        if (b.current.memoizedState.isDehydrated) {
          var c = tc(b.pendingLanes);
          0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
        }
        break;
      case 13:
        Rk(function() {
          var b2 = ih(a, 1);
          if (null !== b2) {
            var c2 = R();
            gi(b2, a, 1, c2);
          }
        }), il(a, 1);
    }
  };
  Fc = function(a) {
    if (13 === a.tag) {
      var b = ih(a, 134217728);
      if (null !== b) {
        var c = R();
        gi(b, a, 134217728, c);
      }
      il(a, 134217728);
    }
  };
  Gc = function(a) {
    if (13 === a.tag) {
      var b = yi(a), c = ih(a, b);
      if (null !== c) {
        var d = R();
        gi(c, a, b, d);
      }
      il(a, b);
    }
  };
  Hc = function() {
    return C;
  };
  Ic = function(a, b) {
    var c = C;
    try {
      return C = a, b();
    } finally {
      C = c;
    }
  };
  yb = function(a, b, c) {
    switch (b) {
      case "input":
        bb(a, c);
        b = c.name;
        if ("radio" === c.type && null != b) {
          for (c = a; c.parentNode; ) c = c.parentNode;
          c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
          for (b = 0; b < c.length; b++) {
            var d = c[b];
            if (d !== a && d.form === a.form) {
              var e = Db(d);
              if (!e) throw Error(p(90));
              Wa(d);
              bb(d, e);
            }
          }
        }
        break;
      case "textarea":
        ib(a, c);
        break;
      case "select":
        b = c.value, null != b && fb(a, !!c.multiple, b, false);
    }
  };
  Gb = Qk;
  Hb = Rk;
  var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
  var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
    a = Zb(a);
    return null === a ? null : a.stateNode;
  }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
    var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vl.isDisabled && vl.supportsFiber) try {
      kc = vl.inject(ul), lc = vl;
    } catch (a) {
    }
  }
  reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
  reactDom_production_min.createPortal = function(a, b) {
    var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!nl(b)) throw Error(p(200));
    return cl(a, b, null, c);
  };
  reactDom_production_min.createRoot = function(a, b) {
    if (!nl(a)) throw Error(p(299));
    var c = false, d = "", e = kl;
    null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
    b = bl(a, 1, false, null, null, c, false, d, e);
    a[uf] = b.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    return new ll(b);
  };
  reactDom_production_min.findDOMNode = function(a) {
    if (null == a) return null;
    if (1 === a.nodeType) return a;
    var b = a._reactInternals;
    if (void 0 === b) {
      if ("function" === typeof a.render) throw Error(p(188));
      a = Object.keys(a).join(",");
      throw Error(p(268, a));
    }
    a = Zb(b);
    a = null === a ? null : a.stateNode;
    return a;
  };
  reactDom_production_min.flushSync = function(a) {
    return Rk(a);
  };
  reactDom_production_min.hydrate = function(a, b, c) {
    if (!ol(b)) throw Error(p(200));
    return rl(null, a, b, true, c);
  };
  reactDom_production_min.hydrateRoot = function(a, b, c) {
    if (!nl(a)) throw Error(p(405));
    var d = null != c && c.hydratedSources || null, e = false, f2 = "", g = kl;
    null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f2 = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
    b = el(b, null, a, 1, null != c ? c : null, e, false, f2, g);
    a[uf] = b.current;
    sf(a);
    if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
      c,
      e
    );
    return new ml(b);
  };
  reactDom_production_min.render = function(a, b, c) {
    if (!ol(b)) throw Error(p(200));
    return rl(null, a, b, false, c);
  };
  reactDom_production_min.unmountComponentAtNode = function(a) {
    if (!ol(a)) throw Error(p(40));
    return a._reactRootContainer ? (Rk(function() {
      rl(null, null, a, false, function() {
        a._reactRootContainer = null;
        a[uf] = null;
      });
    }), true) : false;
  };
  reactDom_production_min.unstable_batchedUpdates = Qk;
  reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
    if (!ol(c)) throw Error(p(200));
    if (null == a || void 0 === a._reactInternals) throw Error(p(38));
    return rl(a, b, c, false, d);
  };
  reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    reactDom.exports = reactDom_production_min;
  }
  var reactDomExports = reactDom.exports;
  var m = reactDomExports;
  {
    client.createRoot = m.createRoot;
    client.hydrateRoot = m.hydrateRoot;
  }
  var Subscribable = class {
    constructor() {
      this.listeners = /* @__PURE__ */ new Set();
      this.subscribe = this.subscribe.bind(this);
    }
    subscribe(listener) {
      this.listeners.add(listener);
      this.onSubscribe();
      return () => {
        this.listeners.delete(listener);
        this.onUnsubscribe();
      };
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {
    }
    onUnsubscribe() {
    }
  };
  var defaultTimeoutProvider = {
    // We need the wrapper function syntax below instead of direct references to
    // global setTimeout etc.
    //
    // BAD: `setTimeout: setTimeout`
    // GOOD: `setTimeout: (cb, delay) => setTimeout(cb, delay)`
    //
    // If we use direct references here, then anything that wants to spy on or
    // replace the global setTimeout (like tests) won't work since we'll already
    // have a hard reference to the original implementation at the time when this
    // file was imported.
    setTimeout: (callback, delay) => setTimeout(callback, delay),
    clearTimeout: (timeoutId) => clearTimeout(timeoutId),
    setInterval: (callback, delay) => setInterval(callback, delay),
    clearInterval: (intervalId) => clearInterval(intervalId)
  };
  var TimeoutManager = (_a = class {
    constructor() {
      // We cannot have TimeoutManager<T> as we must instantiate it with a concrete
      // type at app boot; and if we leave that type, then any new timer provider
      // would need to support ReturnType<typeof setTimeout>, which is infeasible.
      //
      // We settle for type safety for the TimeoutProvider type, and accept that
      // this class is unsafe internally to allow for extension.
      __privateAdd(this, _provider, defaultTimeoutProvider);
      __privateAdd(this, _providerCalled, false);
    }
    setTimeoutProvider(provider) {
      __privateSet(this, _provider, provider);
    }
    setTimeout(callback, delay) {
      return __privateGet(this, _provider).setTimeout(callback, delay);
    }
    clearTimeout(timeoutId) {
      __privateGet(this, _provider).clearTimeout(timeoutId);
    }
    setInterval(callback, delay) {
      return __privateGet(this, _provider).setInterval(callback, delay);
    }
    clearInterval(intervalId) {
      __privateGet(this, _provider).clearInterval(intervalId);
    }
  }, _provider = new WeakMap(), _providerCalled = new WeakMap(), _a);
  var timeoutManager = new TimeoutManager();
  function systemSetTimeoutZero(callback) {
    setTimeout(callback, 0);
  }
  var isServer = typeof window === "undefined" || "Deno" in globalThis;
  function noop() {
  }
  function functionalUpdate(updater, input) {
    return typeof updater === "function" ? updater(input) : updater;
  }
  function isValidTimeout(value) {
    return typeof value === "number" && value >= 0 && value !== Infinity;
  }
  function timeUntilStale(updatedAt, staleTime) {
    return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
  }
  function resolveStaleTime(staleTime, query) {
    return typeof staleTime === "function" ? staleTime(query) : staleTime;
  }
  function resolveEnabled(enabled, query) {
    return typeof enabled === "function" ? enabled(query) : enabled;
  }
  function matchQuery(filters, query) {
    const {
      type = "all",
      exact,
      fetchStatus,
      predicate,
      queryKey,
      stale
    } = filters;
    if (queryKey) {
      if (exact) {
        if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
          return false;
        }
      } else if (!partialMatchKey(query.queryKey, queryKey)) {
        return false;
      }
    }
    if (type !== "all") {
      const isActive = query.isActive();
      if (type === "active" && !isActive) {
        return false;
      }
      if (type === "inactive" && isActive) {
        return false;
      }
    }
    if (typeof stale === "boolean" && query.isStale() !== stale) {
      return false;
    }
    if (fetchStatus && fetchStatus !== query.state.fetchStatus) {
      return false;
    }
    if (predicate && !predicate(query)) {
      return false;
    }
    return true;
  }
  function matchMutation(filters, mutation) {
    const { exact, status, predicate, mutationKey } = filters;
    if (mutationKey) {
      if (!mutation.options.mutationKey) {
        return false;
      }
      if (exact) {
        if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) {
          return false;
        }
      } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
        return false;
      }
    }
    if (status && mutation.state.status !== status) {
      return false;
    }
    if (predicate && !predicate(mutation)) {
      return false;
    }
    return true;
  }
  function hashQueryKeyByOptions(queryKey, options) {
    const hashFn = (options == null ? void 0 : options.queryKeyHashFn) || hashKey;
    return hashFn(queryKey);
  }
  function hashKey(queryKey) {
    return JSON.stringify(
      queryKey,
      (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
        result[key] = val[key];
        return result;
      }, {}) : val
    );
  }
  function partialMatchKey(a, b) {
    if (a === b) {
      return true;
    }
    if (typeof a !== typeof b) {
      return false;
    }
    if (a && b && typeof a === "object" && typeof b === "object") {
      return Object.keys(b).every((key) => partialMatchKey(a[key], b[key]));
    }
    return false;
  }
  var hasOwn = Object.prototype.hasOwnProperty;
  function replaceEqualDeep(a, b) {
    if (a === b) {
      return a;
    }
    const array = isPlainArray(a) && isPlainArray(b);
    if (!array && !(isPlainObject(a) && isPlainObject(b))) return b;
    const aItems = array ? a : Object.keys(a);
    const aSize = aItems.length;
    const bItems = array ? b : Object.keys(b);
    const bSize = bItems.length;
    const copy = array ? new Array(bSize) : {};
    let equalItems = 0;
    for (let i = 0; i < bSize; i++) {
      const key = array ? i : bItems[i];
      const aItem = a[key];
      const bItem = b[key];
      if (aItem === bItem) {
        copy[key] = aItem;
        if (array ? i < aSize : hasOwn.call(a, key)) equalItems++;
        continue;
      }
      if (aItem === null || bItem === null || typeof aItem !== "object" || typeof bItem !== "object") {
        copy[key] = bItem;
        continue;
      }
      const v2 = replaceEqualDeep(aItem, bItem);
      copy[key] = v2;
      if (v2 === aItem) equalItems++;
    }
    return aSize === bSize && equalItems === aSize ? a : copy;
  }
  function shallowEqualObjects(a, b) {
    if (!b || Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }
    for (const key in a) {
      if (a[key] !== b[key]) {
        return false;
      }
    }
    return true;
  }
  function isPlainArray(value) {
    return Array.isArray(value) && value.length === Object.keys(value).length;
  }
  function isPlainObject(o) {
    if (!hasObjectPrototype(o)) {
      return false;
    }
    const ctor = o.constructor;
    if (ctor === void 0) {
      return true;
    }
    const prot = ctor.prototype;
    if (!hasObjectPrototype(prot)) {
      return false;
    }
    if (!prot.hasOwnProperty("isPrototypeOf")) {
      return false;
    }
    if (Object.getPrototypeOf(o) !== Object.prototype) {
      return false;
    }
    return true;
  }
  function hasObjectPrototype(o) {
    return Object.prototype.toString.call(o) === "[object Object]";
  }
  function sleep(timeout) {
    return new Promise((resolve) => {
      timeoutManager.setTimeout(resolve, timeout);
    });
  }
  function replaceData(prevData, data, options) {
    if (typeof options.structuralSharing === "function") {
      return options.structuralSharing(prevData, data);
    } else if (options.structuralSharing !== false) {
      return replaceEqualDeep(prevData, data);
    }
    return data;
  }
  function addToEnd(items, item, max = 0) {
    const newItems = [...items, item];
    return max && newItems.length > max ? newItems.slice(1) : newItems;
  }
  function addToStart(items, item, max = 0) {
    const newItems = [item, ...items];
    return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
  }
  var skipToken = Symbol();
  function ensureQueryFn(options, fetchOptions) {
    if (!options.queryFn && (fetchOptions == null ? void 0 : fetchOptions.initialPromise)) {
      return () => fetchOptions.initialPromise;
    }
    if (!options.queryFn || options.queryFn === skipToken) {
      return () => Promise.reject(new Error(`Missing queryFn: '${options.queryHash}'`));
    }
    return options.queryFn;
  }
  function shouldThrowError(throwOnError, params) {
    if (typeof throwOnError === "function") {
      return throwOnError(...params);
    }
    return !!throwOnError;
  }
  var FocusManager = (_b = class extends Subscribable {
    constructor() {
      super();
      __privateAdd(this, _focused);
      __privateAdd(this, _cleanup);
      __privateAdd(this, _setup);
      __privateSet(this, _setup, (onFocus) => {
        if (!isServer && window.addEventListener) {
          const listener = () => onFocus();
          window.addEventListener("visibilitychange", listener, false);
          return () => {
            window.removeEventListener("visibilitychange", listener);
          };
        }
        return;
      });
    }
    onSubscribe() {
      if (!__privateGet(this, _cleanup)) {
        this.setEventListener(__privateGet(this, _setup));
      }
    }
    onUnsubscribe() {
      var _a2;
      if (!this.hasListeners()) {
        (_a2 = __privateGet(this, _cleanup)) == null ? void 0 : _a2.call(this);
        __privateSet(this, _cleanup, void 0);
      }
    }
    setEventListener(setup) {
      var _a2;
      __privateSet(this, _setup, setup);
      (_a2 = __privateGet(this, _cleanup)) == null ? void 0 : _a2.call(this);
      __privateSet(this, _cleanup, setup((focused) => {
        if (typeof focused === "boolean") {
          this.setFocused(focused);
        } else {
          this.onFocus();
        }
      }));
    }
    setFocused(focused) {
      const changed = __privateGet(this, _focused) !== focused;
      if (changed) {
        __privateSet(this, _focused, focused);
        this.onFocus();
      }
    }
    onFocus() {
      const isFocused = this.isFocused();
      this.listeners.forEach((listener) => {
        listener(isFocused);
      });
    }
    isFocused() {
      var _a2;
      if (typeof __privateGet(this, _focused) === "boolean") {
        return __privateGet(this, _focused);
      }
      return ((_a2 = globalThis.document) == null ? void 0 : _a2.visibilityState) !== "hidden";
    }
  }, _focused = new WeakMap(), _cleanup = new WeakMap(), _setup = new WeakMap(), _b);
  var focusManager = new FocusManager();
  function pendingThenable() {
    let resolve;
    let reject;
    const thenable = new Promise((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    });
    thenable.status = "pending";
    thenable.catch(() => {
    });
    function finalize(data) {
      Object.assign(thenable, data);
      delete thenable.resolve;
      delete thenable.reject;
    }
    thenable.resolve = (value) => {
      finalize({
        status: "fulfilled",
        value
      });
      resolve(value);
    };
    thenable.reject = (reason) => {
      finalize({
        status: "rejected",
        reason
      });
      reject(reason);
    };
    return thenable;
  }
  var defaultScheduler = systemSetTimeoutZero;
  function createNotifyManager() {
    let queue = [];
    let transactions = 0;
    let notifyFn = (callback) => {
      callback();
    };
    let batchNotifyFn = (callback) => {
      callback();
    };
    let scheduleFn = defaultScheduler;
    const schedule = (callback) => {
      if (transactions) {
        queue.push(callback);
      } else {
        scheduleFn(() => {
          notifyFn(callback);
        });
      }
    };
    const flush = () => {
      const originalQueue = queue;
      queue = [];
      if (originalQueue.length) {
        scheduleFn(() => {
          batchNotifyFn(() => {
            originalQueue.forEach((callback) => {
              notifyFn(callback);
            });
          });
        });
      }
    };
    return {
      batch: (callback) => {
        let result;
        transactions++;
        try {
          result = callback();
        } finally {
          transactions--;
          if (!transactions) {
            flush();
          }
        }
        return result;
      },
      /**
       * All calls to the wrapped function will be batched.
       */
      batchCalls: (callback) => {
        return (...args) => {
          schedule(() => {
            callback(...args);
          });
        };
      },
      schedule,
      /**
       * Use this method to set a custom notify function.
       * This can be used to for example wrap notifications with `React.act` while running tests.
       */
      setNotifyFunction: (fn) => {
        notifyFn = fn;
      },
      /**
       * Use this method to set a custom function to batch notifications together into a single tick.
       * By default React Query will use the batch function provided by ReactDOM or React Native.
       */
      setBatchNotifyFunction: (fn) => {
        batchNotifyFn = fn;
      },
      setScheduler: (fn) => {
        scheduleFn = fn;
      }
    };
  }
  var notifyManager = createNotifyManager();
  var OnlineManager = (_c = class extends Subscribable {
    constructor() {
      super();
      __privateAdd(this, _online, true);
      __privateAdd(this, _cleanup2);
      __privateAdd(this, _setup2);
      __privateSet(this, _setup2, (onOnline) => {
        if (!isServer && window.addEventListener) {
          const onlineListener = () => onOnline(true);
          const offlineListener = () => onOnline(false);
          window.addEventListener("online", onlineListener, false);
          window.addEventListener("offline", offlineListener, false);
          return () => {
            window.removeEventListener("online", onlineListener);
            window.removeEventListener("offline", offlineListener);
          };
        }
        return;
      });
    }
    onSubscribe() {
      if (!__privateGet(this, _cleanup2)) {
        this.setEventListener(__privateGet(this, _setup2));
      }
    }
    onUnsubscribe() {
      var _a2;
      if (!this.hasListeners()) {
        (_a2 = __privateGet(this, _cleanup2)) == null ? void 0 : _a2.call(this);
        __privateSet(this, _cleanup2, void 0);
      }
    }
    setEventListener(setup) {
      var _a2;
      __privateSet(this, _setup2, setup);
      (_a2 = __privateGet(this, _cleanup2)) == null ? void 0 : _a2.call(this);
      __privateSet(this, _cleanup2, setup(this.setOnline.bind(this)));
    }
    setOnline(online) {
      const changed = __privateGet(this, _online) !== online;
      if (changed) {
        __privateSet(this, _online, online);
        this.listeners.forEach((listener) => {
          listener(online);
        });
      }
    }
    isOnline() {
      return __privateGet(this, _online);
    }
  }, _online = new WeakMap(), _cleanup2 = new WeakMap(), _setup2 = new WeakMap(), _c);
  var onlineManager = new OnlineManager();
  function defaultRetryDelay(failureCount) {
    return Math.min(1e3 * __pow(2, failureCount), 3e4);
  }
  function canFetch(networkMode) {
    return (networkMode != null ? networkMode : "online") === "online" ? onlineManager.isOnline() : true;
  }
  var CancelledError = class extends Error {
    constructor(options) {
      super("CancelledError");
      this.revert = options == null ? void 0 : options.revert;
      this.silent = options == null ? void 0 : options.silent;
    }
  };
  function createRetryer(config) {
    let isRetryCancelled = false;
    let failureCount = 0;
    let continueFn;
    const thenable = pendingThenable();
    const isResolved = () => thenable.status !== "pending";
    const cancel = (cancelOptions) => {
      var _a2;
      if (!isResolved()) {
        const error = new CancelledError(cancelOptions);
        reject(error);
        (_a2 = config.onCancel) == null ? void 0 : _a2.call(config, error);
      }
    };
    const cancelRetry = () => {
      isRetryCancelled = true;
    };
    const continueRetry = () => {
      isRetryCancelled = false;
    };
    const canContinue = () => focusManager.isFocused() && (config.networkMode === "always" || onlineManager.isOnline()) && config.canRun();
    const canStart = () => canFetch(config.networkMode) && config.canRun();
    const resolve = (value) => {
      if (!isResolved()) {
        continueFn == null ? void 0 : continueFn();
        thenable.resolve(value);
      }
    };
    const reject = (value) => {
      if (!isResolved()) {
        continueFn == null ? void 0 : continueFn();
        thenable.reject(value);
      }
    };
    const pause = () => {
      return new Promise((continueResolve) => {
        var _a2;
        continueFn = (value) => {
          if (isResolved() || canContinue()) {
            continueResolve(value);
          }
        };
        (_a2 = config.onPause) == null ? void 0 : _a2.call(config);
      }).then(() => {
        var _a2;
        continueFn = void 0;
        if (!isResolved()) {
          (_a2 = config.onContinue) == null ? void 0 : _a2.call(config);
        }
      });
    };
    const run = () => {
      if (isResolved()) {
        return;
      }
      let promiseOrValue;
      const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
      try {
        promiseOrValue = initialPromise != null ? initialPromise : config.fn();
      } catch (error) {
        promiseOrValue = Promise.reject(error);
      }
      Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
        var _a2, _b2, _c2;
        if (isResolved()) {
          return;
        }
        const retry = (_a2 = config.retry) != null ? _a2 : isServer ? 0 : 3;
        const retryDelay = (_b2 = config.retryDelay) != null ? _b2 : defaultRetryDelay;
        const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
        const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
        if (isRetryCancelled || !shouldRetry) {
          reject(error);
          return;
        }
        failureCount++;
        (_c2 = config.onFail) == null ? void 0 : _c2.call(config, failureCount, error);
        sleep(delay).then(() => {
          return canContinue() ? void 0 : pause();
        }).then(() => {
          if (isRetryCancelled) {
            reject(error);
          } else {
            run();
          }
        });
      });
    };
    return {
      promise: thenable,
      status: () => thenable.status,
      cancel,
      continue: () => {
        continueFn == null ? void 0 : continueFn();
        return thenable;
      },
      cancelRetry,
      continueRetry,
      canStart,
      start: () => {
        if (canStart()) {
          run();
        } else {
          pause().then(run);
        }
        return thenable;
      }
    };
  }
  var Removable = (_d = class {
    constructor() {
      __privateAdd(this, _gcTimeout);
    }
    destroy() {
      this.clearGcTimeout();
    }
    scheduleGc() {
      this.clearGcTimeout();
      if (isValidTimeout(this.gcTime)) {
        __privateSet(this, _gcTimeout, timeoutManager.setTimeout(() => {
          this.optionalRemove();
        }, this.gcTime));
      }
    }
    updateGcTime(newGcTime) {
      this.gcTime = Math.max(
        this.gcTime || 0,
        newGcTime != null ? newGcTime : isServer ? Infinity : 5 * 60 * 1e3
      );
    }
    clearGcTimeout() {
      if (__privateGet(this, _gcTimeout)) {
        timeoutManager.clearTimeout(__privateGet(this, _gcTimeout));
        __privateSet(this, _gcTimeout, void 0);
      }
    }
  }, _gcTimeout = new WeakMap(), _d);
  var Query = (_e = class extends Removable {
    constructor(config) {
      var _a2;
      super();
      __privateAdd(this, _Query_instances);
      __privateAdd(this, _initialState);
      __privateAdd(this, _revertState);
      __privateAdd(this, _cache);
      __privateAdd(this, _client);
      __privateAdd(this, _retryer);
      __privateAdd(this, _defaultOptions);
      __privateAdd(this, _abortSignalConsumed);
      __privateSet(this, _abortSignalConsumed, false);
      __privateSet(this, _defaultOptions, config.defaultOptions);
      this.setOptions(config.options);
      this.observers = [];
      __privateSet(this, _client, config.client);
      __privateSet(this, _cache, __privateGet(this, _client).getQueryCache());
      this.queryKey = config.queryKey;
      this.queryHash = config.queryHash;
      __privateSet(this, _initialState, getDefaultState$1(this.options));
      this.state = (_a2 = config.state) != null ? _a2 : __privateGet(this, _initialState);
      this.scheduleGc();
    }
    get meta() {
      return this.options.meta;
    }
    get promise() {
      var _a2;
      return (_a2 = __privateGet(this, _retryer)) == null ? void 0 : _a2.promise;
    }
    setOptions(options) {
      this.options = __spreadValues(__spreadValues({}, __privateGet(this, _defaultOptions)), options);
      this.updateGcTime(this.options.gcTime);
      if (this.state && this.state.data === void 0) {
        const defaultState = getDefaultState$1(this.options);
        if (defaultState.data !== void 0) {
          this.setData(defaultState.data, {
            updatedAt: defaultState.dataUpdatedAt,
            manual: true
          });
          __privateSet(this, _initialState, defaultState);
        }
      }
    }
    optionalRemove() {
      if (!this.observers.length && this.state.fetchStatus === "idle") {
        __privateGet(this, _cache).remove(this);
      }
    }
    setData(newData, options) {
      const data = replaceData(this.state.data, newData, this.options);
      __privateMethod(this, _Query_instances, dispatch_fn).call(this, {
        data,
        type: "success",
        dataUpdatedAt: options == null ? void 0 : options.updatedAt,
        manual: options == null ? void 0 : options.manual
      });
      return data;
    }
    setState(state, setStateOptions) {
      __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "setState", state, setStateOptions });
    }
    cancel(options) {
      var _a2, _b2;
      const promise = (_a2 = __privateGet(this, _retryer)) == null ? void 0 : _a2.promise;
      (_b2 = __privateGet(this, _retryer)) == null ? void 0 : _b2.cancel(options);
      return promise ? promise.then(noop).catch(noop) : Promise.resolve();
    }
    destroy() {
      super.destroy();
      this.cancel({ silent: true });
    }
    reset() {
      this.destroy();
      this.setState(__privateGet(this, _initialState));
    }
    isActive() {
      return this.observers.some(
        (observer) => resolveEnabled(observer.options.enabled, this) !== false
      );
    }
    isDisabled() {
      if (this.getObserversCount() > 0) {
        return !this.isActive();
      }
      return this.options.queryFn === skipToken || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
    }
    isStatic() {
      if (this.getObserversCount() > 0) {
        return this.observers.some(
          (observer) => resolveStaleTime(observer.options.staleTime, this) === "static"
        );
      }
      return false;
    }
    isStale() {
      if (this.getObserversCount() > 0) {
        return this.observers.some(
          (observer) => observer.getCurrentResult().isStale
        );
      }
      return this.state.data === void 0 || this.state.isInvalidated;
    }
    isStaleByTime(staleTime = 0) {
      if (this.state.data === void 0) {
        return true;
      }
      if (staleTime === "static") {
        return false;
      }
      if (this.state.isInvalidated) {
        return true;
      }
      return !timeUntilStale(this.state.dataUpdatedAt, staleTime);
    }
    onFocus() {
      var _a2;
      const observer = this.observers.find((x2) => x2.shouldFetchOnWindowFocus());
      observer == null ? void 0 : observer.refetch({ cancelRefetch: false });
      (_a2 = __privateGet(this, _retryer)) == null ? void 0 : _a2.continue();
    }
    onOnline() {
      var _a2;
      const observer = this.observers.find((x2) => x2.shouldFetchOnReconnect());
      observer == null ? void 0 : observer.refetch({ cancelRefetch: false });
      (_a2 = __privateGet(this, _retryer)) == null ? void 0 : _a2.continue();
    }
    addObserver(observer) {
      if (!this.observers.includes(observer)) {
        this.observers.push(observer);
        this.clearGcTimeout();
        __privateGet(this, _cache).notify({ type: "observerAdded", query: this, observer });
      }
    }
    removeObserver(observer) {
      if (this.observers.includes(observer)) {
        this.observers = this.observers.filter((x2) => x2 !== observer);
        if (!this.observers.length) {
          if (__privateGet(this, _retryer)) {
            if (__privateGet(this, _abortSignalConsumed)) {
              __privateGet(this, _retryer).cancel({ revert: true });
            } else {
              __privateGet(this, _retryer).cancelRetry();
            }
          }
          this.scheduleGc();
        }
        __privateGet(this, _cache).notify({ type: "observerRemoved", query: this, observer });
      }
    }
    getObserversCount() {
      return this.observers.length;
    }
    invalidate() {
      if (!this.state.isInvalidated) {
        __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "invalidate" });
      }
    }
    fetch(options, fetchOptions) {
      return __async(this, null, function* () {
        var _a2, _b2, _c2, _d2, _e2, _f, _g2, _h2, _i2, _j2, _k2, _l2;
        if (this.state.fetchStatus !== "idle" && // If the promise in the retyer is already rejected, we have to definitely
        // re-start the fetch; there is a chance that the query is still in a
        // pending state when that happens
        ((_a2 = __privateGet(this, _retryer)) == null ? void 0 : _a2.status()) !== "rejected") {
          if (this.state.data !== void 0 && (fetchOptions == null ? void 0 : fetchOptions.cancelRefetch)) {
            this.cancel({ silent: true });
          } else if (__privateGet(this, _retryer)) {
            __privateGet(this, _retryer).continueRetry();
            return __privateGet(this, _retryer).promise;
          }
        }
        if (options) {
          this.setOptions(options);
        }
        if (!this.options.queryFn) {
          const observer = this.observers.find((x2) => x2.options.queryFn);
          if (observer) {
            this.setOptions(observer.options);
          }
        }
        const abortController = new AbortController();
        const addSignalProperty = (object) => {
          Object.defineProperty(object, "signal", {
            enumerable: true,
            get: () => {
              __privateSet(this, _abortSignalConsumed, true);
              return abortController.signal;
            }
          });
        };
        const fetchFn = () => {
          const queryFn = ensureQueryFn(this.options, fetchOptions);
          const createQueryFnContext = () => {
            const queryFnContext2 = {
              client: __privateGet(this, _client),
              queryKey: this.queryKey,
              meta: this.meta
            };
            addSignalProperty(queryFnContext2);
            return queryFnContext2;
          };
          const queryFnContext = createQueryFnContext();
          __privateSet(this, _abortSignalConsumed, false);
          if (this.options.persister) {
            return this.options.persister(
              queryFn,
              queryFnContext,
              this
            );
          }
          return queryFn(queryFnContext);
        };
        const createFetchContext = () => {
          const context2 = {
            fetchOptions,
            options: this.options,
            queryKey: this.queryKey,
            client: __privateGet(this, _client),
            state: this.state,
            fetchFn
          };
          addSignalProperty(context2);
          return context2;
        };
        const context = createFetchContext();
        (_b2 = this.options.behavior) == null ? void 0 : _b2.onFetch(context, this);
        __privateSet(this, _revertState, this.state);
        if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((_c2 = context.fetchOptions) == null ? void 0 : _c2.meta)) {
          __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "fetch", meta: (_d2 = context.fetchOptions) == null ? void 0 : _d2.meta });
        }
        __privateSet(this, _retryer, createRetryer({
          initialPromise: fetchOptions == null ? void 0 : fetchOptions.initialPromise,
          fn: context.fetchFn,
          onCancel: (error) => {
            if (error instanceof CancelledError && error.revert) {
              this.setState(__spreadProps(__spreadValues({}, __privateGet(this, _revertState)), {
                fetchStatus: "idle"
              }));
            }
            abortController.abort();
          },
          onFail: (failureCount, error) => {
            __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "failed", failureCount, error });
          },
          onPause: () => {
            __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "pause" });
          },
          onContinue: () => {
            __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "continue" });
          },
          retry: context.options.retry,
          retryDelay: context.options.retryDelay,
          networkMode: context.options.networkMode,
          canRun: () => true
        }));
        try {
          const data = yield __privateGet(this, _retryer).start();
          if (data === void 0) {
            if (false) ;
            throw new Error(`${this.queryHash} data is undefined`);
          }
          this.setData(data);
          (_f = (_e2 = __privateGet(this, _cache).config).onSuccess) == null ? void 0 : _f.call(_e2, data, this);
          (_h2 = (_g2 = __privateGet(this, _cache).config).onSettled) == null ? void 0 : _h2.call(
            _g2,
            data,
            this.state.error,
            this
          );
          return data;
        } catch (error) {
          if (error instanceof CancelledError) {
            if (error.silent) {
              return __privateGet(this, _retryer).promise;
            } else if (error.revert) {
              if (this.state.data === void 0) {
                throw error;
              }
              return this.state.data;
            }
          }
          __privateMethod(this, _Query_instances, dispatch_fn).call(this, {
            type: "error",
            error
          });
          (_j2 = (_i2 = __privateGet(this, _cache).config).onError) == null ? void 0 : _j2.call(
            _i2,
            error,
            this
          );
          (_l2 = (_k2 = __privateGet(this, _cache).config).onSettled) == null ? void 0 : _l2.call(
            _k2,
            this.state.data,
            error,
            this
          );
          throw error;
        } finally {
          this.scheduleGc();
        }
      });
    }
  }, _initialState = new WeakMap(), _revertState = new WeakMap(), _cache = new WeakMap(), _client = new WeakMap(), _retryer = new WeakMap(), _defaultOptions = new WeakMap(), _abortSignalConsumed = new WeakMap(), _Query_instances = new WeakSet(), dispatch_fn = function(action) {
    const reducer = (state) => {
      var _a2, _b2;
      switch (action.type) {
        case "failed":
          return __spreadProps(__spreadValues({}, state), {
            fetchFailureCount: action.failureCount,
            fetchFailureReason: action.error
          });
        case "pause":
          return __spreadProps(__spreadValues({}, state), {
            fetchStatus: "paused"
          });
        case "continue":
          return __spreadProps(__spreadValues({}, state), {
            fetchStatus: "fetching"
          });
        case "fetch":
          return __spreadProps(__spreadValues(__spreadValues({}, state), fetchState(state.data, this.options)), {
            fetchMeta: (_a2 = action.meta) != null ? _a2 : null
          });
        case "success":
          const newState = __spreadValues(__spreadProps(__spreadValues({}, state), {
            data: action.data,
            dataUpdateCount: state.dataUpdateCount + 1,
            dataUpdatedAt: (_b2 = action.dataUpdatedAt) != null ? _b2 : Date.now(),
            error: null,
            isInvalidated: false,
            status: "success"
          }), !action.manual && {
            fetchStatus: "idle",
            fetchFailureCount: 0,
            fetchFailureReason: null
          });
          __privateSet(this, _revertState, action.manual ? newState : void 0);
          return newState;
        case "error":
          const error = action.error;
          return __spreadProps(__spreadValues({}, state), {
            error,
            errorUpdateCount: state.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: state.fetchFailureCount + 1,
            fetchFailureReason: error,
            fetchStatus: "idle",
            status: "error"
          });
        case "invalidate":
          return __spreadProps(__spreadValues({}, state), {
            isInvalidated: true
          });
        case "setState":
          return __spreadValues(__spreadValues({}, state), action.state);
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onQueryUpdate();
      });
      __privateGet(this, _cache).notify({ query: this, type: "updated", action });
    });
  }, _e);
  function fetchState(data, options) {
    return __spreadValues({
      fetchFailureCount: 0,
      fetchFailureReason: null,
      fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused"
    }, data === void 0 && {
      error: null,
      status: "pending"
    });
  }
  function getDefaultState$1(options) {
    const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
    const hasData = data !== void 0;
    const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
    return {
      data,
      dataUpdateCount: 0,
      dataUpdatedAt: hasData ? initialDataUpdatedAt != null ? initialDataUpdatedAt : Date.now() : 0,
      error: null,
      errorUpdateCount: 0,
      errorUpdatedAt: 0,
      fetchFailureCount: 0,
      fetchFailureReason: null,
      fetchMeta: null,
      isInvalidated: false,
      status: hasData ? "success" : "pending",
      fetchStatus: "idle"
    };
  }
  var QueryObserver = (_g = class extends Subscribable {
    constructor(client2, options) {
      super();
      __privateAdd(this, _QueryObserver_instances);
      __privateAdd(this, _client2);
      __privateAdd(this, _currentQuery);
      __privateAdd(this, _currentQueryInitialState);
      __privateAdd(this, _currentResult);
      __privateAdd(this, _currentResultState);
      __privateAdd(this, _currentResultOptions);
      __privateAdd(this, _currentThenable);
      __privateAdd(this, _selectError);
      __privateAdd(this, _selectFn);
      __privateAdd(this, _selectResult);
      // This property keeps track of the last query with defined data.
      // It will be used to pass the previous data and query to the placeholder function between renders.
      __privateAdd(this, _lastQueryWithDefinedData);
      __privateAdd(this, _staleTimeoutId);
      __privateAdd(this, _refetchIntervalId);
      __privateAdd(this, _currentRefetchInterval);
      __privateAdd(this, _trackedProps, /* @__PURE__ */ new Set());
      this.options = options;
      __privateSet(this, _client2, client2);
      __privateSet(this, _selectError, null);
      __privateSet(this, _currentThenable, pendingThenable());
      this.bindMethods();
      this.setOptions(options);
    }
    bindMethods() {
      this.refetch = this.refetch.bind(this);
    }
    onSubscribe() {
      if (this.listeners.size === 1) {
        __privateGet(this, _currentQuery).addObserver(this);
        if (shouldFetchOnMount(__privateGet(this, _currentQuery), this.options)) {
          __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
        } else {
          this.updateResult();
        }
        __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
      }
    }
    onUnsubscribe() {
      if (!this.hasListeners()) {
        this.destroy();
      }
    }
    shouldFetchOnReconnect() {
      return shouldFetchOn(
        __privateGet(this, _currentQuery),
        this.options,
        this.options.refetchOnReconnect
      );
    }
    shouldFetchOnWindowFocus() {
      return shouldFetchOn(
        __privateGet(this, _currentQuery),
        this.options,
        this.options.refetchOnWindowFocus
      );
    }
    destroy() {
      this.listeners = /* @__PURE__ */ new Set();
      __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
      __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
      __privateGet(this, _currentQuery).removeObserver(this);
    }
    setOptions(options) {
      const prevOptions = this.options;
      const prevQuery = __privateGet(this, _currentQuery);
      this.options = __privateGet(this, _client2).defaultQueryOptions(options);
      if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== "boolean") {
        throw new Error(
          "Expected enabled to be a boolean or a callback that returns a boolean"
        );
      }
      __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
      __privateGet(this, _currentQuery).setOptions(this.options);
      if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
        __privateGet(this, _client2).getQueryCache().notify({
          type: "observerOptionsUpdated",
          query: __privateGet(this, _currentQuery),
          observer: this
        });
      }
      const mounted = this.hasListeners();
      if (mounted && shouldFetchOptionally(
        __privateGet(this, _currentQuery),
        prevQuery,
        this.options,
        prevOptions
      )) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      }
      this.updateResult();
      if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || resolveStaleTime(this.options.staleTime, __privateGet(this, _currentQuery)) !== resolveStaleTime(prevOptions.staleTime, __privateGet(this, _currentQuery)))) {
        __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
      }
      const nextRefetchInterval = __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this);
      if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || nextRefetchInterval !== __privateGet(this, _currentRefetchInterval))) {
        __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, nextRefetchInterval);
      }
    }
    getOptimisticResult(options) {
      const query = __privateGet(this, _client2).getQueryCache().build(__privateGet(this, _client2), options);
      const result = this.createResult(query, options);
      if (shouldAssignObserverCurrentProperties(this, result)) {
        __privateSet(this, _currentResult, result);
        __privateSet(this, _currentResultOptions, this.options);
        __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
      }
      return result;
    }
    getCurrentResult() {
      return __privateGet(this, _currentResult);
    }
    trackResult(result, onPropTracked) {
      return new Proxy(result, {
        get: (target, key) => {
          this.trackProp(key);
          onPropTracked == null ? void 0 : onPropTracked(key);
          if (key === "promise" && !this.options.experimental_prefetchInRender && __privateGet(this, _currentThenable).status === "pending") {
            __privateGet(this, _currentThenable).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            );
          }
          return Reflect.get(target, key);
        }
      });
    }
    trackProp(key) {
      __privateGet(this, _trackedProps).add(key);
    }
    getCurrentQuery() {
      return __privateGet(this, _currentQuery);
    }
    refetch(_f = {}) {
      var options = __objRest(_f, []);
      return this.fetch(__spreadValues({}, options));
    }
    fetchOptimistic(options) {
      const defaultedOptions = __privateGet(this, _client2).defaultQueryOptions(options);
      const query = __privateGet(this, _client2).getQueryCache().build(__privateGet(this, _client2), defaultedOptions);
      return query.fetch().then(() => this.createResult(query, defaultedOptions));
    }
    fetch(fetchOptions) {
      var _a2;
      return __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this, __spreadProps(__spreadValues({}, fetchOptions), {
        cancelRefetch: (_a2 = fetchOptions.cancelRefetch) != null ? _a2 : true
      })).then(() => {
        this.updateResult();
        return __privateGet(this, _currentResult);
      });
    }
    createResult(query, options) {
      var _a2;
      const prevQuery = __privateGet(this, _currentQuery);
      const prevOptions = this.options;
      const prevResult = __privateGet(this, _currentResult);
      const prevResultState = __privateGet(this, _currentResultState);
      const prevResultOptions = __privateGet(this, _currentResultOptions);
      const queryChange = query !== prevQuery;
      const queryInitialState = queryChange ? query.state : __privateGet(this, _currentQueryInitialState);
      const { state } = query;
      let newState = __spreadValues({}, state);
      let isPlaceholderData = false;
      let data;
      if (options._optimisticResults) {
        const mounted = this.hasListeners();
        const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
        const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
        if (fetchOnMount || fetchOptionally) {
          newState = __spreadValues(__spreadValues({}, newState), fetchState(state.data, query.options));
        }
        if (options._optimisticResults === "isRestoring") {
          newState.fetchStatus = "idle";
        }
      }
      let { error, errorUpdatedAt, status } = newState;
      data = newState.data;
      let skipSelect = false;
      if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
        let placeholderData;
        if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
          placeholderData = prevResult.data;
          skipSelect = true;
        } else {
          placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
            (_a2 = __privateGet(this, _lastQueryWithDefinedData)) == null ? void 0 : _a2.state.data,
            __privateGet(this, _lastQueryWithDefinedData)
          ) : options.placeholderData;
        }
        if (placeholderData !== void 0) {
          status = "success";
          data = replaceData(
            prevResult == null ? void 0 : prevResult.data,
            placeholderData,
            options
          );
          isPlaceholderData = true;
        }
      }
      if (options.select && data !== void 0 && !skipSelect) {
        if (prevResult && data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === __privateGet(this, _selectFn)) {
          data = __privateGet(this, _selectResult);
        } else {
          try {
            __privateSet(this, _selectFn, options.select);
            data = options.select(data);
            data = replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
            __privateSet(this, _selectResult, data);
            __privateSet(this, _selectError, null);
          } catch (selectError) {
            __privateSet(this, _selectError, selectError);
          }
        }
      }
      if (__privateGet(this, _selectError)) {
        error = __privateGet(this, _selectError);
        data = __privateGet(this, _selectResult);
        errorUpdatedAt = Date.now();
        status = "error";
      }
      const isFetching = newState.fetchStatus === "fetching";
      const isPending = status === "pending";
      const isError = status === "error";
      const isLoading = isPending && isFetching;
      const hasData = data !== void 0;
      const result = {
        status,
        fetchStatus: newState.fetchStatus,
        isPending,
        isSuccess: status === "success",
        isError,
        isInitialLoading: isLoading,
        isLoading,
        data,
        dataUpdatedAt: newState.dataUpdatedAt,
        error,
        errorUpdatedAt,
        failureCount: newState.fetchFailureCount,
        failureReason: newState.fetchFailureReason,
        errorUpdateCount: newState.errorUpdateCount,
        isFetched: newState.dataUpdateCount > 0 || newState.errorUpdateCount > 0,
        isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
        isFetching,
        isRefetching: isFetching && !isPending,
        isLoadingError: isError && !hasData,
        isPaused: newState.fetchStatus === "paused",
        isPlaceholderData,
        isRefetchError: isError && hasData,
        isStale: isStale(query, options),
        refetch: this.refetch,
        promise: __privateGet(this, _currentThenable),
        isEnabled: resolveEnabled(options.enabled, query) !== false
      };
      const nextResult = result;
      if (this.options.experimental_prefetchInRender) {
        const finalizeThenableIfPossible = (thenable) => {
          if (nextResult.status === "error") {
            thenable.reject(nextResult.error);
          } else if (nextResult.data !== void 0) {
            thenable.resolve(nextResult.data);
          }
        };
        const recreateThenable = () => {
          const pending = __privateSet(this, _currentThenable, nextResult.promise = pendingThenable());
          finalizeThenableIfPossible(pending);
        };
        const prevThenable = __privateGet(this, _currentThenable);
        switch (prevThenable.status) {
          case "pending":
            if (query.queryHash === prevQuery.queryHash) {
              finalizeThenableIfPossible(prevThenable);
            }
            break;
          case "fulfilled":
            if (nextResult.status === "error" || nextResult.data !== prevThenable.value) {
              recreateThenable();
            }
            break;
          case "rejected":
            if (nextResult.status !== "error" || nextResult.error !== prevThenable.reason) {
              recreateThenable();
            }
            break;
        }
      }
      return nextResult;
    }
    updateResult() {
      const prevResult = __privateGet(this, _currentResult);
      const nextResult = this.createResult(__privateGet(this, _currentQuery), this.options);
      __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
      __privateSet(this, _currentResultOptions, this.options);
      if (__privateGet(this, _currentResultState).data !== void 0) {
        __privateSet(this, _lastQueryWithDefinedData, __privateGet(this, _currentQuery));
      }
      if (shallowEqualObjects(nextResult, prevResult)) {
        return;
      }
      __privateSet(this, _currentResult, nextResult);
      const shouldNotifyListeners = () => {
        if (!prevResult) {
          return true;
        }
        const { notifyOnChangeProps } = this.options;
        const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
        if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !__privateGet(this, _trackedProps).size) {
          return true;
        }
        const includedProps = new Set(
          notifyOnChangePropsValue != null ? notifyOnChangePropsValue : __privateGet(this, _trackedProps)
        );
        if (this.options.throwOnError) {
          includedProps.add("error");
        }
        return Object.keys(__privateGet(this, _currentResult)).some((key) => {
          const typedKey = key;
          const changed = __privateGet(this, _currentResult)[typedKey] !== prevResult[typedKey];
          return changed && includedProps.has(typedKey);
        });
      };
      __privateMethod(this, _QueryObserver_instances, notify_fn).call(this, { listeners: shouldNotifyListeners() });
    }
    onQueryUpdate() {
      this.updateResult();
      if (this.hasListeners()) {
        __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
      }
    }
  }, _client2 = new WeakMap(), _currentQuery = new WeakMap(), _currentQueryInitialState = new WeakMap(), _currentResult = new WeakMap(), _currentResultState = new WeakMap(), _currentResultOptions = new WeakMap(), _currentThenable = new WeakMap(), _selectError = new WeakMap(), _selectFn = new WeakMap(), _selectResult = new WeakMap(), _lastQueryWithDefinedData = new WeakMap(), _staleTimeoutId = new WeakMap(), _refetchIntervalId = new WeakMap(), _currentRefetchInterval = new WeakMap(), _trackedProps = new WeakMap(), _QueryObserver_instances = new WeakSet(), executeFetch_fn = function(fetchOptions) {
    __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
    let promise = __privateGet(this, _currentQuery).fetch(
      this.options,
      fetchOptions
    );
    if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
      promise = promise.catch(noop);
    }
    return promise;
  }, updateStaleTimeout_fn = function() {
    __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
    const staleTime = resolveStaleTime(
      this.options.staleTime,
      __privateGet(this, _currentQuery)
    );
    if (isServer || __privateGet(this, _currentResult).isStale || !isValidTimeout(staleTime)) {
      return;
    }
    const time = timeUntilStale(__privateGet(this, _currentResult).dataUpdatedAt, staleTime);
    const timeout = time + 1;
    __privateSet(this, _staleTimeoutId, timeoutManager.setTimeout(() => {
      if (!__privateGet(this, _currentResult).isStale) {
        this.updateResult();
      }
    }, timeout));
  }, computeRefetchInterval_fn = function() {
    var _a2;
    return (_a2 = typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(__privateGet(this, _currentQuery)) : this.options.refetchInterval) != null ? _a2 : false;
  }, updateRefetchInterval_fn = function(nextInterval) {
    __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
    __privateSet(this, _currentRefetchInterval, nextInterval);
    if (isServer || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) === false || !isValidTimeout(__privateGet(this, _currentRefetchInterval)) || __privateGet(this, _currentRefetchInterval) === 0) {
      return;
    }
    __privateSet(this, _refetchIntervalId, timeoutManager.setInterval(() => {
      if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      }
    }, __privateGet(this, _currentRefetchInterval)));
  }, updateTimers_fn = function() {
    __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
    __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this));
  }, clearStaleTimeout_fn = function() {
    if (__privateGet(this, _staleTimeoutId)) {
      timeoutManager.clearTimeout(__privateGet(this, _staleTimeoutId));
      __privateSet(this, _staleTimeoutId, void 0);
    }
  }, clearRefetchInterval_fn = function() {
    if (__privateGet(this, _refetchIntervalId)) {
      timeoutManager.clearInterval(__privateGet(this, _refetchIntervalId));
      __privateSet(this, _refetchIntervalId, void 0);
    }
  }, updateQuery_fn = function() {
    const query = __privateGet(this, _client2).getQueryCache().build(__privateGet(this, _client2), this.options);
    if (query === __privateGet(this, _currentQuery)) {
      return;
    }
    const prevQuery = __privateGet(this, _currentQuery);
    __privateSet(this, _currentQuery, query);
    __privateSet(this, _currentQueryInitialState, query.state);
    if (this.hasListeners()) {
      prevQuery == null ? void 0 : prevQuery.removeObserver(this);
      query.addObserver(this);
    }
  }, notify_fn = function(notifyOptions) {
    notifyManager.batch(() => {
      if (notifyOptions.listeners) {
        this.listeners.forEach((listener) => {
          listener(__privateGet(this, _currentResult));
        });
      }
      __privateGet(this, _client2).getQueryCache().notify({
        query: __privateGet(this, _currentQuery),
        type: "observerResultsUpdated"
      });
    });
  }, _g);
  function shouldLoadOnMount(query, options) {
    return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
  }
  function shouldFetchOnMount(query, options) {
    return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
  }
  function shouldFetchOn(query, options, field) {
    if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
      const value = typeof field === "function" ? field(query) : field;
      return value === "always" || value !== false && isStale(query, options);
    }
    return false;
  }
  function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
    return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
  }
  function isStale(query, options) {
    return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
  }
  function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
    if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
      return true;
    }
    return false;
  }
  function infiniteQueryBehavior(pages) {
    return {
      onFetch: (context, query) => {
        var _a2, _b2, _c2, _d2, _e2;
        const options = context.options;
        const direction = (_c2 = (_b2 = (_a2 = context.fetchOptions) == null ? void 0 : _a2.meta) == null ? void 0 : _b2.fetchMore) == null ? void 0 : _c2.direction;
        const oldPages = ((_d2 = context.state.data) == null ? void 0 : _d2.pages) || [];
        const oldPageParams = ((_e2 = context.state.data) == null ? void 0 : _e2.pageParams) || [];
        let result = { pages: [], pageParams: [] };
        let currentPage = 0;
        const fetchFn = () => __async(this, null, function* () {
          var _a3;
          let cancelled = false;
          const addSignalProperty = (object) => {
            Object.defineProperty(object, "signal", {
              enumerable: true,
              get: () => {
                if (context.signal.aborted) {
                  cancelled = true;
                } else {
                  context.signal.addEventListener("abort", () => {
                    cancelled = true;
                  });
                }
                return context.signal;
              }
            });
          };
          const queryFn = ensureQueryFn(context.options, context.fetchOptions);
          const fetchPage = (data, param, previous) => __async(this, null, function* () {
            if (cancelled) {
              return Promise.reject();
            }
            if (param == null && data.pages.length) {
              return Promise.resolve(data);
            }
            const createQueryFnContext = () => {
              const queryFnContext2 = {
                client: context.client,
                queryKey: context.queryKey,
                pageParam: param,
                direction: previous ? "backward" : "forward",
                meta: context.options.meta
              };
              addSignalProperty(queryFnContext2);
              return queryFnContext2;
            };
            const queryFnContext = createQueryFnContext();
            const page = yield queryFn(queryFnContext);
            const { maxPages } = context.options;
            const addTo = previous ? addToStart : addToEnd;
            return {
              pages: addTo(data.pages, page, maxPages),
              pageParams: addTo(data.pageParams, param, maxPages)
            };
          });
          if (direction && oldPages.length) {
            const previous = direction === "backward";
            const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
            const oldData = {
              pages: oldPages,
              pageParams: oldPageParams
            };
            const param = pageParamFn(options, oldData);
            result = yield fetchPage(oldData, param, previous);
          } else {
            const remainingPages = pages != null ? pages : oldPages.length;
            do {
              const param = currentPage === 0 ? (_a3 = oldPageParams[0]) != null ? _a3 : options.initialPageParam : getNextPageParam(options, result);
              if (currentPage > 0 && param == null) {
                break;
              }
              result = yield fetchPage(result, param);
              currentPage++;
            } while (currentPage < remainingPages);
          }
          return result;
        });
        if (context.options.persister) {
          context.fetchFn = () => {
            var _a3, _b3;
            return (_b3 = (_a3 = context.options).persister) == null ? void 0 : _b3.call(
              _a3,
              fetchFn,
              {
                client: context.client,
                queryKey: context.queryKey,
                meta: context.options.meta,
                signal: context.signal
              },
              query
            );
          };
        } else {
          context.fetchFn = fetchFn;
        }
      }
    };
  }
  function getNextPageParam(options, { pages, pageParams }) {
    const lastIndex = pages.length - 1;
    return pages.length > 0 ? options.getNextPageParam(
      pages[lastIndex],
      pages,
      pageParams[lastIndex],
      pageParams
    ) : void 0;
  }
  function getPreviousPageParam(options, { pages, pageParams }) {
    var _a2;
    return pages.length > 0 ? (_a2 = options.getPreviousPageParam) == null ? void 0 : _a2.call(options, pages[0], pages, pageParams[0], pageParams) : void 0;
  }
  var Mutation = (_h = class extends Removable {
    constructor(config) {
      super();
      __privateAdd(this, _Mutation_instances);
      __privateAdd(this, _client3);
      __privateAdd(this, _observers);
      __privateAdd(this, _mutationCache);
      __privateAdd(this, _retryer2);
      __privateSet(this, _client3, config.client);
      this.mutationId = config.mutationId;
      __privateSet(this, _mutationCache, config.mutationCache);
      __privateSet(this, _observers, []);
      this.state = config.state || getDefaultState();
      this.setOptions(config.options);
      this.scheduleGc();
    }
    setOptions(options) {
      this.options = options;
      this.updateGcTime(this.options.gcTime);
    }
    get meta() {
      return this.options.meta;
    }
    addObserver(observer) {
      if (!__privateGet(this, _observers).includes(observer)) {
        __privateGet(this, _observers).push(observer);
        this.clearGcTimeout();
        __privateGet(this, _mutationCache).notify({
          type: "observerAdded",
          mutation: this,
          observer
        });
      }
    }
    removeObserver(observer) {
      __privateSet(this, _observers, __privateGet(this, _observers).filter((x2) => x2 !== observer));
      this.scheduleGc();
      __privateGet(this, _mutationCache).notify({
        type: "observerRemoved",
        mutation: this,
        observer
      });
    }
    optionalRemove() {
      if (!__privateGet(this, _observers).length) {
        if (this.state.status === "pending") {
          this.scheduleGc();
        } else {
          __privateGet(this, _mutationCache).remove(this);
        }
      }
    }
    continue() {
      var _a2, _b2;
      return (_b2 = (_a2 = __privateGet(this, _retryer2)) == null ? void 0 : _a2.continue()) != null ? _b2 : (
        // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
        this.execute(this.state.variables)
      );
    }
    execute(variables) {
      return __async(this, null, function* () {
        var _a2, _b2, _c2, _d2, _e2, _f, _g2, _h2, _i2, _j2, _k2, _l2, _m, _n, _o, _p, _q, _r, _s, _t, _u;
        const onContinue = () => {
          __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "continue" });
        };
        const mutationFnContext = {
          client: __privateGet(this, _client3),
          meta: this.options.meta,
          mutationKey: this.options.mutationKey
        };
        __privateSet(this, _retryer2, createRetryer({
          fn: () => {
            if (!this.options.mutationFn) {
              return Promise.reject(new Error("No mutationFn found"));
            }
            return this.options.mutationFn(variables, mutationFnContext);
          },
          onFail: (failureCount, error) => {
            __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "failed", failureCount, error });
          },
          onPause: () => {
            __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "pause" });
          },
          onContinue,
          retry: (_a2 = this.options.retry) != null ? _a2 : 0,
          retryDelay: this.options.retryDelay,
          networkMode: this.options.networkMode,
          canRun: () => __privateGet(this, _mutationCache).canRun(this)
        }));
        const restored = this.state.status === "pending";
        const isPaused = !__privateGet(this, _retryer2).canStart();
        try {
          if (restored) {
            onContinue();
          } else {
            __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "pending", variables, isPaused });
            yield (_c2 = (_b2 = __privateGet(this, _mutationCache).config).onMutate) == null ? void 0 : _c2.call(
              _b2,
              variables,
              this,
              mutationFnContext
            );
            const context = yield (_e2 = (_d2 = this.options).onMutate) == null ? void 0 : _e2.call(
              _d2,
              variables,
              mutationFnContext
            );
            if (context !== this.state.context) {
              __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, {
                type: "pending",
                context,
                variables,
                isPaused
              });
            }
          }
          const data = yield __privateGet(this, _retryer2).start();
          yield (_g2 = (_f = __privateGet(this, _mutationCache).config).onSuccess) == null ? void 0 : _g2.call(
            _f,
            data,
            variables,
            this.state.context,
            this,
            mutationFnContext
          );
          yield (_i2 = (_h2 = this.options).onSuccess) == null ? void 0 : _i2.call(
            _h2,
            data,
            variables,
            this.state.context,
            mutationFnContext
          );
          yield (_k2 = (_j2 = __privateGet(this, _mutationCache).config).onSettled) == null ? void 0 : _k2.call(
            _j2,
            data,
            null,
            this.state.variables,
            this.state.context,
            this,
            mutationFnContext
          );
          yield (_m = (_l2 = this.options).onSettled) == null ? void 0 : _m.call(
            _l2,
            data,
            null,
            variables,
            this.state.context,
            mutationFnContext
          );
          __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "success", data });
          return data;
        } catch (error) {
          try {
            yield (_o = (_n = __privateGet(this, _mutationCache).config).onError) == null ? void 0 : _o.call(
              _n,
              error,
              variables,
              this.state.context,
              this,
              mutationFnContext
            );
            yield (_q = (_p = this.options).onError) == null ? void 0 : _q.call(
              _p,
              error,
              variables,
              this.state.context,
              mutationFnContext
            );
            yield (_s = (_r = __privateGet(this, _mutationCache).config).onSettled) == null ? void 0 : _s.call(
              _r,
              void 0,
              error,
              this.state.variables,
              this.state.context,
              this,
              mutationFnContext
            );
            yield (_u = (_t = this.options).onSettled) == null ? void 0 : _u.call(
              _t,
              void 0,
              error,
              variables,
              this.state.context,
              mutationFnContext
            );
            throw error;
          } finally {
            __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "error", error });
          }
        } finally {
          __privateGet(this, _mutationCache).runNext(this);
        }
      });
    }
  }, _client3 = new WeakMap(), _observers = new WeakMap(), _mutationCache = new WeakMap(), _retryer2 = new WeakMap(), _Mutation_instances = new WeakSet(), dispatch_fn2 = function(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return __spreadProps(__spreadValues({}, state), {
            failureCount: action.failureCount,
            failureReason: action.error
          });
        case "pause":
          return __spreadProps(__spreadValues({}, state), {
            isPaused: true
          });
        case "continue":
          return __spreadProps(__spreadValues({}, state), {
            isPaused: false
          });
        case "pending":
          return __spreadProps(__spreadValues({}, state), {
            context: action.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: action.isPaused,
            status: "pending",
            variables: action.variables,
            submittedAt: Date.now()
          });
        case "success":
          return __spreadProps(__spreadValues({}, state), {
            data: action.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: false
          });
        case "error":
          return __spreadProps(__spreadValues({}, state), {
            data: void 0,
            error: action.error,
            failureCount: state.failureCount + 1,
            failureReason: action.error,
            isPaused: false,
            status: "error"
          });
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      __privateGet(this, _observers).forEach((observer) => {
        observer.onMutationUpdate(action);
      });
      __privateGet(this, _mutationCache).notify({
        mutation: this,
        type: "updated",
        action
      });
    });
  }, _h);
  function getDefaultState() {
    return {
      context: void 0,
      data: void 0,
      error: null,
      failureCount: 0,
      failureReason: null,
      isPaused: false,
      status: "idle",
      variables: void 0,
      submittedAt: 0
    };
  }
  var MutationCache = (_i = class extends Subscribable {
    constructor(config = {}) {
      super();
      __privateAdd(this, _mutations);
      __privateAdd(this, _scopes);
      __privateAdd(this, _mutationId);
      this.config = config;
      __privateSet(this, _mutations, /* @__PURE__ */ new Set());
      __privateSet(this, _scopes, /* @__PURE__ */ new Map());
      __privateSet(this, _mutationId, 0);
    }
    build(client2, options, state) {
      const mutation = new Mutation({
        client: client2,
        mutationCache: this,
        mutationId: ++__privateWrapper(this, _mutationId)._,
        options: client2.defaultMutationOptions(options),
        state
      });
      this.add(mutation);
      return mutation;
    }
    add(mutation) {
      __privateGet(this, _mutations).add(mutation);
      const scope = scopeFor(mutation);
      if (typeof scope === "string") {
        const scopedMutations = __privateGet(this, _scopes).get(scope);
        if (scopedMutations) {
          scopedMutations.push(mutation);
        } else {
          __privateGet(this, _scopes).set(scope, [mutation]);
        }
      }
      this.notify({ type: "added", mutation });
    }
    remove(mutation) {
      if (__privateGet(this, _mutations).delete(mutation)) {
        const scope = scopeFor(mutation);
        if (typeof scope === "string") {
          const scopedMutations = __privateGet(this, _scopes).get(scope);
          if (scopedMutations) {
            if (scopedMutations.length > 1) {
              const index = scopedMutations.indexOf(mutation);
              if (index !== -1) {
                scopedMutations.splice(index, 1);
              }
            } else if (scopedMutations[0] === mutation) {
              __privateGet(this, _scopes).delete(scope);
            }
          }
        }
      }
      this.notify({ type: "removed", mutation });
    }
    canRun(mutation) {
      const scope = scopeFor(mutation);
      if (typeof scope === "string") {
        const mutationsWithSameScope = __privateGet(this, _scopes).get(scope);
        const firstPendingMutation = mutationsWithSameScope == null ? void 0 : mutationsWithSameScope.find(
          (m2) => m2.state.status === "pending"
        );
        return !firstPendingMutation || firstPendingMutation === mutation;
      } else {
        return true;
      }
    }
    runNext(mutation) {
      var _a2, _b2;
      const scope = scopeFor(mutation);
      if (typeof scope === "string") {
        const foundMutation = (_a2 = __privateGet(this, _scopes).get(scope)) == null ? void 0 : _a2.find((m2) => m2 !== mutation && m2.state.isPaused);
        return (_b2 = foundMutation == null ? void 0 : foundMutation.continue()) != null ? _b2 : Promise.resolve();
      } else {
        return Promise.resolve();
      }
    }
    clear() {
      notifyManager.batch(() => {
        __privateGet(this, _mutations).forEach((mutation) => {
          this.notify({ type: "removed", mutation });
        });
        __privateGet(this, _mutations).clear();
        __privateGet(this, _scopes).clear();
      });
    }
    getAll() {
      return Array.from(__privateGet(this, _mutations));
    }
    find(filters) {
      const defaultedFilters = __spreadValues({ exact: true }, filters);
      return this.getAll().find(
        (mutation) => matchMutation(defaultedFilters, mutation)
      );
    }
    findAll(filters = {}) {
      return this.getAll().filter((mutation) => matchMutation(filters, mutation));
    }
    notify(event) {
      notifyManager.batch(() => {
        this.listeners.forEach((listener) => {
          listener(event);
        });
      });
    }
    resumePausedMutations() {
      const pausedMutations = this.getAll().filter((x2) => x2.state.isPaused);
      return notifyManager.batch(
        () => Promise.all(
          pausedMutations.map((mutation) => mutation.continue().catch(noop))
        )
      );
    }
  }, _mutations = new WeakMap(), _scopes = new WeakMap(), _mutationId = new WeakMap(), _i);
  function scopeFor(mutation) {
    var _a2;
    return (_a2 = mutation.options.scope) == null ? void 0 : _a2.id;
  }
  var MutationObserver$1 = (_j = class extends Subscribable {
    constructor(client2, options) {
      super();
      __privateAdd(this, _MutationObserver_instances);
      __privateAdd(this, _client4);
      __privateAdd(this, _currentResult2);
      __privateAdd(this, _currentMutation);
      __privateAdd(this, _mutateOptions);
      __privateSet(this, _client4, client2);
      this.setOptions(options);
      this.bindMethods();
      __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    }
    bindMethods() {
      this.mutate = this.mutate.bind(this);
      this.reset = this.reset.bind(this);
    }
    setOptions(options) {
      var _a2;
      const prevOptions = this.options;
      this.options = __privateGet(this, _client4).defaultMutationOptions(options);
      if (!shallowEqualObjects(this.options, prevOptions)) {
        __privateGet(this, _client4).getMutationCache().notify({
          type: "observerOptionsUpdated",
          mutation: __privateGet(this, _currentMutation),
          observer: this
        });
      }
      if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
        this.reset();
      } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
        __privateGet(this, _currentMutation).setOptions(this.options);
      }
    }
    onUnsubscribe() {
      var _a2;
      if (!this.hasListeners()) {
        (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
      }
    }
    onMutationUpdate(action) {
      __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
      __privateMethod(this, _MutationObserver_instances, notify_fn2).call(this, action);
    }
    getCurrentResult() {
      return __privateGet(this, _currentResult2);
    }
    reset() {
      var _a2;
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
      __privateSet(this, _currentMutation, void 0);
      __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
      __privateMethod(this, _MutationObserver_instances, notify_fn2).call(this);
    }
    mutate(variables, options) {
      var _a2;
      __privateSet(this, _mutateOptions, options);
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
      __privateSet(this, _currentMutation, __privateGet(this, _client4).getMutationCache().build(__privateGet(this, _client4), this.options));
      __privateGet(this, _currentMutation).addObserver(this);
      return __privateGet(this, _currentMutation).execute(variables);
    }
  }, _client4 = new WeakMap(), _currentResult2 = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
    var _a2, _b2;
    const state = (_b2 = (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) != null ? _b2 : getDefaultState();
    __privateSet(this, _currentResult2, __spreadProps(__spreadValues({}, state), {
      isPending: state.status === "pending",
      isSuccess: state.status === "success",
      isError: state.status === "error",
      isIdle: state.status === "idle",
      mutate: this.mutate,
      reset: this.reset
    }));
  }, notify_fn2 = function(action) {
    notifyManager.batch(() => {
      var _a2, _b2, _c2, _d2, _e2, _f, _g2, _h2;
      if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
        const variables = __privateGet(this, _currentResult2).variables;
        const onMutateResult = __privateGet(this, _currentResult2).context;
        const context = {
          client: __privateGet(this, _client4),
          meta: this.options.meta,
          mutationKey: this.options.mutationKey
        };
        if ((action == null ? void 0 : action.type) === "success") {
          (_b2 = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b2.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
          (_d2 = (_c2 = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d2.call(
            _c2,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } else if ((action == null ? void 0 : action.type) === "error") {
          (_f = (_e2 = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e2,
            action.error,
            variables,
            onMutateResult,
            context
          );
          (_h2 = (_g2 = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h2.call(
            _g2,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        }
      }
      this.listeners.forEach((listener) => {
        listener(__privateGet(this, _currentResult2));
      });
    });
  }, _j);
  var QueryCache = (_k = class extends Subscribable {
    constructor(config = {}) {
      super();
      __privateAdd(this, _queries);
      this.config = config;
      __privateSet(this, _queries, /* @__PURE__ */ new Map());
    }
    build(client2, options, state) {
      var _a2;
      const queryKey = options.queryKey;
      const queryHash = (_a2 = options.queryHash) != null ? _a2 : hashQueryKeyByOptions(queryKey, options);
      let query = this.get(queryHash);
      if (!query) {
        query = new Query({
          client: client2,
          queryKey,
          queryHash,
          options: client2.defaultQueryOptions(options),
          state,
          defaultOptions: client2.getQueryDefaults(queryKey)
        });
        this.add(query);
      }
      return query;
    }
    add(query) {
      if (!__privateGet(this, _queries).has(query.queryHash)) {
        __privateGet(this, _queries).set(query.queryHash, query);
        this.notify({
          type: "added",
          query
        });
      }
    }
    remove(query) {
      const queryInMap = __privateGet(this, _queries).get(query.queryHash);
      if (queryInMap) {
        query.destroy();
        if (queryInMap === query) {
          __privateGet(this, _queries).delete(query.queryHash);
        }
        this.notify({ type: "removed", query });
      }
    }
    clear() {
      notifyManager.batch(() => {
        this.getAll().forEach((query) => {
          this.remove(query);
        });
      });
    }
    get(queryHash) {
      return __privateGet(this, _queries).get(queryHash);
    }
    getAll() {
      return [...__privateGet(this, _queries).values()];
    }
    find(filters) {
      const defaultedFilters = __spreadValues({ exact: true }, filters);
      return this.getAll().find(
        (query) => matchQuery(defaultedFilters, query)
      );
    }
    findAll(filters = {}) {
      const queries = this.getAll();
      return Object.keys(filters).length > 0 ? queries.filter((query) => matchQuery(filters, query)) : queries;
    }
    notify(event) {
      notifyManager.batch(() => {
        this.listeners.forEach((listener) => {
          listener(event);
        });
      });
    }
    onFocus() {
      notifyManager.batch(() => {
        this.getAll().forEach((query) => {
          query.onFocus();
        });
      });
    }
    onOnline() {
      notifyManager.batch(() => {
        this.getAll().forEach((query) => {
          query.onOnline();
        });
      });
    }
  }, _queries = new WeakMap(), _k);
  var QueryClient = (_l = class {
    constructor(config = {}) {
      __privateAdd(this, _queryCache);
      __privateAdd(this, _mutationCache2);
      __privateAdd(this, _defaultOptions2);
      __privateAdd(this, _queryDefaults);
      __privateAdd(this, _mutationDefaults);
      __privateAdd(this, _mountCount);
      __privateAdd(this, _unsubscribeFocus);
      __privateAdd(this, _unsubscribeOnline);
      __privateSet(this, _queryCache, config.queryCache || new QueryCache());
      __privateSet(this, _mutationCache2, config.mutationCache || new MutationCache());
      __privateSet(this, _defaultOptions2, config.defaultOptions || {});
      __privateSet(this, _queryDefaults, /* @__PURE__ */ new Map());
      __privateSet(this, _mutationDefaults, /* @__PURE__ */ new Map());
      __privateSet(this, _mountCount, 0);
    }
    mount() {
      __privateWrapper(this, _mountCount)._++;
      if (__privateGet(this, _mountCount) !== 1) return;
      __privateSet(this, _unsubscribeFocus, focusManager.subscribe((focused) => __async(this, null, function* () {
        if (focused) {
          yield this.resumePausedMutations();
          __privateGet(this, _queryCache).onFocus();
        }
      })));
      __privateSet(this, _unsubscribeOnline, onlineManager.subscribe((online) => __async(this, null, function* () {
        if (online) {
          yield this.resumePausedMutations();
          __privateGet(this, _queryCache).onOnline();
        }
      })));
    }
    unmount() {
      var _a2, _b2;
      __privateWrapper(this, _mountCount)._--;
      if (__privateGet(this, _mountCount) !== 0) return;
      (_a2 = __privateGet(this, _unsubscribeFocus)) == null ? void 0 : _a2.call(this);
      __privateSet(this, _unsubscribeFocus, void 0);
      (_b2 = __privateGet(this, _unsubscribeOnline)) == null ? void 0 : _b2.call(this);
      __privateSet(this, _unsubscribeOnline, void 0);
    }
    isFetching(filters) {
      return __privateGet(this, _queryCache).findAll(__spreadProps(__spreadValues({}, filters), { fetchStatus: "fetching" })).length;
    }
    isMutating(filters) {
      return __privateGet(this, _mutationCache2).findAll(__spreadProps(__spreadValues({}, filters), { status: "pending" })).length;
    }
    /**
     * Imperative (non-reactive) way to retrieve data for a QueryKey.
     * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
     *
     * Hint: Do not use this function inside a component, because it won't receive updates.
     * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
     */
    getQueryData(queryKey) {
      var _a2;
      const options = this.defaultQueryOptions({ queryKey });
      return (_a2 = __privateGet(this, _queryCache).get(options.queryHash)) == null ? void 0 : _a2.state.data;
    }
    ensureQueryData(options) {
      const defaultedOptions = this.defaultQueryOptions(options);
      const query = __privateGet(this, _queryCache).build(this, defaultedOptions);
      const cachedData = query.state.data;
      if (cachedData === void 0) {
        return this.fetchQuery(options);
      }
      if (options.revalidateIfStale && query.isStaleByTime(resolveStaleTime(defaultedOptions.staleTime, query))) {
        void this.prefetchQuery(defaultedOptions);
      }
      return Promise.resolve(cachedData);
    }
    getQueriesData(filters) {
      return __privateGet(this, _queryCache).findAll(filters).map(({ queryKey, state }) => {
        const data = state.data;
        return [queryKey, data];
      });
    }
    setQueryData(queryKey, updater, options) {
      const defaultedOptions = this.defaultQueryOptions({ queryKey });
      const query = __privateGet(this, _queryCache).get(
        defaultedOptions.queryHash
      );
      const prevData = query == null ? void 0 : query.state.data;
      const data = functionalUpdate(updater, prevData);
      if (data === void 0) {
        return void 0;
      }
      return __privateGet(this, _queryCache).build(this, defaultedOptions).setData(data, __spreadProps(__spreadValues({}, options), { manual: true }));
    }
    setQueriesData(filters, updater, options) {
      return notifyManager.batch(
        () => __privateGet(this, _queryCache).findAll(filters).map(({ queryKey }) => [
          queryKey,
          this.setQueryData(queryKey, updater, options)
        ])
      );
    }
    getQueryState(queryKey) {
      var _a2;
      const options = this.defaultQueryOptions({ queryKey });
      return (_a2 = __privateGet(this, _queryCache).get(
        options.queryHash
      )) == null ? void 0 : _a2.state;
    }
    removeQueries(filters) {
      const queryCache = __privateGet(this, _queryCache);
      notifyManager.batch(() => {
        queryCache.findAll(filters).forEach((query) => {
          queryCache.remove(query);
        });
      });
    }
    resetQueries(filters, options) {
      const queryCache = __privateGet(this, _queryCache);
      return notifyManager.batch(() => {
        queryCache.findAll(filters).forEach((query) => {
          query.reset();
        });
        return this.refetchQueries(
          __spreadValues({
            type: "active"
          }, filters),
          options
        );
      });
    }
    cancelQueries(filters, cancelOptions = {}) {
      const defaultedCancelOptions = __spreadValues({ revert: true }, cancelOptions);
      const promises = notifyManager.batch(
        () => __privateGet(this, _queryCache).findAll(filters).map((query) => query.cancel(defaultedCancelOptions))
      );
      return Promise.all(promises).then(noop).catch(noop);
    }
    invalidateQueries(filters, options = {}) {
      return notifyManager.batch(() => {
        var _a2, _b2;
        __privateGet(this, _queryCache).findAll(filters).forEach((query) => {
          query.invalidate();
        });
        if ((filters == null ? void 0 : filters.refetchType) === "none") {
          return Promise.resolve();
        }
        return this.refetchQueries(
          __spreadProps(__spreadValues({}, filters), {
            type: (_b2 = (_a2 = filters == null ? void 0 : filters.refetchType) != null ? _a2 : filters == null ? void 0 : filters.type) != null ? _b2 : "active"
          }),
          options
        );
      });
    }
    refetchQueries(filters, options = {}) {
      var _a2;
      const fetchOptions = __spreadProps(__spreadValues({}, options), {
        cancelRefetch: (_a2 = options.cancelRefetch) != null ? _a2 : true
      });
      const promises = notifyManager.batch(
        () => __privateGet(this, _queryCache).findAll(filters).filter((query) => !query.isDisabled() && !query.isStatic()).map((query) => {
          let promise = query.fetch(void 0, fetchOptions);
          if (!fetchOptions.throwOnError) {
            promise = promise.catch(noop);
          }
          return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
        })
      );
      return Promise.all(promises).then(noop);
    }
    fetchQuery(options) {
      const defaultedOptions = this.defaultQueryOptions(options);
      if (defaultedOptions.retry === void 0) {
        defaultedOptions.retry = false;
      }
      const query = __privateGet(this, _queryCache).build(this, defaultedOptions);
      return query.isStaleByTime(
        resolveStaleTime(defaultedOptions.staleTime, query)
      ) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
    }
    prefetchQuery(options) {
      return this.fetchQuery(options).then(noop).catch(noop);
    }
    fetchInfiniteQuery(options) {
      options.behavior = infiniteQueryBehavior(options.pages);
      return this.fetchQuery(options);
    }
    prefetchInfiniteQuery(options) {
      return this.fetchInfiniteQuery(options).then(noop).catch(noop);
    }
    ensureInfiniteQueryData(options) {
      options.behavior = infiniteQueryBehavior(options.pages);
      return this.ensureQueryData(options);
    }
    resumePausedMutations() {
      if (onlineManager.isOnline()) {
        return __privateGet(this, _mutationCache2).resumePausedMutations();
      }
      return Promise.resolve();
    }
    getQueryCache() {
      return __privateGet(this, _queryCache);
    }
    getMutationCache() {
      return __privateGet(this, _mutationCache2);
    }
    getDefaultOptions() {
      return __privateGet(this, _defaultOptions2);
    }
    setDefaultOptions(options) {
      __privateSet(this, _defaultOptions2, options);
    }
    setQueryDefaults(queryKey, options) {
      __privateGet(this, _queryDefaults).set(hashKey(queryKey), {
        queryKey,
        defaultOptions: options
      });
    }
    getQueryDefaults(queryKey) {
      const defaults = [...__privateGet(this, _queryDefaults).values()];
      const result = {};
      defaults.forEach((queryDefault) => {
        if (partialMatchKey(queryKey, queryDefault.queryKey)) {
          Object.assign(result, queryDefault.defaultOptions);
        }
      });
      return result;
    }
    setMutationDefaults(mutationKey, options) {
      __privateGet(this, _mutationDefaults).set(hashKey(mutationKey), {
        mutationKey,
        defaultOptions: options
      });
    }
    getMutationDefaults(mutationKey) {
      const defaults = [...__privateGet(this, _mutationDefaults).values()];
      const result = {};
      defaults.forEach((queryDefault) => {
        if (partialMatchKey(mutationKey, queryDefault.mutationKey)) {
          Object.assign(result, queryDefault.defaultOptions);
        }
      });
      return result;
    }
    defaultQueryOptions(options) {
      if (options._defaulted) {
        return options;
      }
      const defaultedOptions = __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, __privateGet(this, _defaultOptions2).queries), this.getQueryDefaults(options.queryKey)), options), {
        _defaulted: true
      });
      if (!defaultedOptions.queryHash) {
        defaultedOptions.queryHash = hashQueryKeyByOptions(
          defaultedOptions.queryKey,
          defaultedOptions
        );
      }
      if (defaultedOptions.refetchOnReconnect === void 0) {
        defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
      }
      if (defaultedOptions.throwOnError === void 0) {
        defaultedOptions.throwOnError = !!defaultedOptions.suspense;
      }
      if (!defaultedOptions.networkMode && defaultedOptions.persister) {
        defaultedOptions.networkMode = "offlineFirst";
      }
      if (defaultedOptions.queryFn === skipToken) {
        defaultedOptions.enabled = false;
      }
      return defaultedOptions;
    }
    defaultMutationOptions(options) {
      if (options == null ? void 0 : options._defaulted) {
        return options;
      }
      return __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, __privateGet(this, _defaultOptions2).mutations), (options == null ? void 0 : options.mutationKey) && this.getMutationDefaults(options.mutationKey)), options), {
        _defaulted: true
      });
    }
    clear() {
      __privateGet(this, _queryCache).clear();
      __privateGet(this, _mutationCache2).clear();
    }
  }, _queryCache = new WeakMap(), _mutationCache2 = new WeakMap(), _defaultOptions2 = new WeakMap(), _queryDefaults = new WeakMap(), _mutationDefaults = new WeakMap(), _mountCount = new WeakMap(), _unsubscribeFocus = new WeakMap(), _unsubscribeOnline = new WeakMap(), _l);
  var QueryClientContext = reactExports.createContext(
    void 0
  );
  var useQueryClient = (queryClient2) => {
    const client2 = reactExports.useContext(QueryClientContext);
    if (!client2) {
      throw new Error("No QueryClient set, use QueryClientProvider to set one");
    }
    return client2;
  };
  var QueryClientProvider = ({
    client: client2,
    children
  }) => {
    reactExports.useEffect(() => {
      client2.mount();
      return () => {
        client2.unmount();
      };
    }, [client2]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientContext.Provider, { value: client2, children });
  };
  var IsRestoringContext = reactExports.createContext(false);
  var useIsRestoring = () => reactExports.useContext(IsRestoringContext);
  IsRestoringContext.Provider;
  function createValue() {
    let isReset = false;
    return {
      clearReset: () => {
        isReset = false;
      },
      reset: () => {
        isReset = true;
      },
      isReset: () => {
        return isReset;
      }
    };
  }
  var QueryErrorResetBoundaryContext = reactExports.createContext(createValue());
  var useQueryErrorResetBoundary = () => reactExports.useContext(QueryErrorResetBoundaryContext);
  var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary) => {
    if (options.suspense || options.throwOnError || options.experimental_prefetchInRender) {
      if (!errorResetBoundary.isReset()) {
        options.retryOnMount = false;
      }
    }
  };
  var useClearResetErrorBoundary = (errorResetBoundary) => {
    reactExports.useEffect(() => {
      errorResetBoundary.clearReset();
    }, [errorResetBoundary]);
  };
  var getHasError = ({
    result,
    errorResetBoundary,
    throwOnError,
    query,
    suspense
  }) => {
    return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
  };
  var ensureSuspenseTimers = (defaultedOptions) => {
    if (defaultedOptions.suspense) {
      const MIN_SUSPENSE_TIME_MS = 1e3;
      const clamp = (value) => value === "static" ? value : Math.max(value != null ? value : MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
      const originalStaleTime = defaultedOptions.staleTime;
      defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
      if (typeof defaultedOptions.gcTime === "number") {
        defaultedOptions.gcTime = Math.max(
          defaultedOptions.gcTime,
          MIN_SUSPENSE_TIME_MS
        );
      }
    }
  };
  var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
  var shouldSuspend = (defaultedOptions, result) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && result.isPending;
  var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
    errorResetBoundary.clearReset();
  });
  function useBaseQuery(options, Observer, queryClient2) {
    var _a2, _b2, _c2, _d2, _e2;
    const isRestoring = useIsRestoring();
    const errorResetBoundary = useQueryErrorResetBoundary();
    const client2 = useQueryClient();
    const defaultedOptions = client2.defaultQueryOptions(options);
    (_b2 = (_a2 = client2.getDefaultOptions().queries) == null ? void 0 : _a2._experimental_beforeQuery) == null ? void 0 : _b2.call(
      _a2,
      defaultedOptions
    );
    defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
    ensureSuspenseTimers(defaultedOptions);
    ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary);
    useClearResetErrorBoundary(errorResetBoundary);
    const isNewCacheEntry = !client2.getQueryCache().get(defaultedOptions.queryHash);
    const [observer] = reactExports.useState(
      () => new Observer(
        client2,
        defaultedOptions
      )
    );
    const result = observer.getOptimisticResult(defaultedOptions);
    const shouldSubscribe = !isRestoring && options.subscribed !== false;
    reactExports.useSyncExternalStore(
      reactExports.useCallback(
        (onStoreChange) => {
          const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
          observer.updateResult();
          return unsubscribe;
        },
        [observer, shouldSubscribe]
      ),
      () => observer.getCurrentResult(),
      () => observer.getCurrentResult()
    );
    reactExports.useEffect(() => {
      observer.setOptions(defaultedOptions);
    }, [defaultedOptions, observer]);
    if (shouldSuspend(defaultedOptions, result)) {
      throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
    }
    if (getHasError({
      result,
      errorResetBoundary,
      throwOnError: defaultedOptions.throwOnError,
      query: client2.getQueryCache().get(defaultedOptions.queryHash),
      suspense: defaultedOptions.suspense
    })) {
      throw result.error;
    }
    (_d2 = (_c2 = client2.getDefaultOptions().queries) == null ? void 0 : _c2._experimental_afterQuery) == null ? void 0 : _d2.call(
      _c2,
      defaultedOptions,
      result
    );
    if (defaultedOptions.experimental_prefetchInRender && !isServer && willFetch(result, isRestoring)) {
      const promise = isNewCacheEntry ? (
        // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
        fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
      ) : (
        // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
        (_e2 = client2.getQueryCache().get(defaultedOptions.queryHash)) == null ? void 0 : _e2.promise
      );
      promise == null ? void 0 : promise.catch(noop).finally(() => {
        observer.updateResult();
      });
    }
    return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
  }
  function useQuery(options, queryClient2) {
    return useBaseQuery(options, QueryObserver);
  }
  function useMutation(options, queryClient2) {
    const client2 = useQueryClient();
    const [observer] = reactExports.useState(
      () => new MutationObserver$1(
        client2,
        options
      )
    );
    reactExports.useEffect(() => {
      observer.setOptions(options);
    }, [observer, options]);
    const result = reactExports.useSyncExternalStore(
      reactExports.useCallback(
        (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
        [observer]
      ),
      () => observer.getCurrentResult(),
      () => observer.getCurrentResult()
    );
    const mutate = reactExports.useCallback(
      (variables, mutateOptions) => {
        observer.mutate(variables, mutateOptions).catch(noop);
      },
      [observer]
    );
    if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
      throw result.error;
    }
    return __spreadProps(__spreadValues({}, result), { mutate, mutateAsync: result.mutate });
  }
  const AuthContext = reactExports.createContext(void 0);
  const STORAGE_KEY$1 = "iptv-lg-webos.credentials";
  function AuthProvider({ children }) {
    const [state, setState] = reactExports.useState({ status: "idle" });
    const value = reactExports.useMemo(
      () => ({
        state,
        setState,
        logout: () => {
          setState({ status: "idle" });
          if (typeof window !== "undefined") {
            window.localStorage.removeItem(STORAGE_KEY$1);
          }
        },
        updateCredentials: (credentials) => {
          setState({ status: "authenticated", credentials });
          if (typeof window !== "undefined") {
            window.localStorage.setItem(STORAGE_KEY$1, JSON.stringify(credentials));
          }
        }
      }),
      [state]
    );
    reactExports.useEffect(() => {
      if (typeof window === "undefined") {
        return;
      }
      const stored = window.localStorage.getItem(STORAGE_KEY$1);
      if (stored) {
        try {
          const credentials = JSON.parse(stored);
          setState({ status: "authenticated", credentials });
        } catch (error) {
          console.error("Failed to parse stored credentials", error);
          window.localStorage.removeItem(STORAGE_KEY$1);
        }
      }
    }, []);
    reactExports.useEffect(() => {
      if (typeof window === "undefined") {
        return;
      }
      if (state.status === "authenticated" && state.credentials) {
        window.localStorage.setItem(STORAGE_KEY$1, JSON.stringify(state.credentials));
      }
      if (state.status === "idle" || state.status === "error") {
        window.localStorage.removeItem(STORAGE_KEY$1);
      }
    }, [state]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value, children });
  }
  function useAuth() {
    const ctx = reactExports.useContext(AuthContext);
    if (!ctx) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
  }
  const REQUEST_TIMEOUT_MS = 8e3;
  const PROXY_PLACEHOLDER = "{url}";
  function getProxyTemplate() {
    var _a2;
    const fromImportMeta = typeof { url: _documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === "SCRIPT" && _documentCurrentScript.src || new URL("assets/index-CncAjdaT.js", document.baseURI).href } !== "undefined" ? "http://localhost:8787/proxy?url=" : void 0;
    if (fromImportMeta && fromImportMeta.trim().length > 0) {
      return fromImportMeta.trim();
    }
    const maybeProcess = globalThis.process;
    const fromProcess = (_a2 = maybeProcess == null ? void 0 : maybeProcess.env) == null ? void 0 : _a2.VITE_XTREAM_PROXY_URL;
    if (fromProcess && fromProcess.trim().length > 0) {
      return fromProcess.trim();
    }
    return void 0;
  }
  function buildProxyUrl(targetUrl) {
    const template = getProxyTemplate();
    if (!template) {
      return void 0;
    }
    const encodedTarget = encodeURIComponent(targetUrl);
    if (template.includes(PROXY_PLACEHOLDER)) {
      return template.replaceAll(PROXY_PLACEHOLDER, encodedTarget);
    }
    const expectsInlineValue = /[?&][^=]*=$/.test(template);
    if (expectsInlineValue) {
      return `${template}${encodedTarget}`;
    }
    const needsQuery = !template.includes("?");
    const separator = needsQuery ? "?" : template.endsWith("?") || template.endsWith("&") ? "" : "&";
    return `${template}${separator}url=${encodedTarget}`;
  }
  function linkAbortSignals(source, target) {
    if (!source) {
      return void 0;
    }
    if (source.aborted) {
      target.abort();
      return void 0;
    }
    const abortHandler = () => target.abort();
    source.addEventListener("abort", abortHandler, { once: true });
    return () => {
      source.removeEventListener("abort", abortHandler);
    };
  }
  function isLikelyCorsError(error) {
    var _a2;
    if (!error || typeof error !== "object") {
      return false;
    }
    const message = (_a2 = error.message) != null ? _a2 : "";
    return /Failed to fetch|NetworkError|TypeError: fetch failed/i.test(message);
  }
  function createXtreamUrl(baseUrl, path, params) {
    const sanitizedBaseUrl = ensureTrailingSlash(baseUrl.trim());
    let url;
    try {
      url = new URL(path, sanitizedBaseUrl);
    } catch (error) {
      throw new Error("URL do servidor IPTV inválida. Inclua http:// ou https:// e o número da porta.");
    }
    Object.entries(params).forEach(([key, value]) => {
      if (value !== void 0 && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
    return url.toString();
  }
  function ensureTrailingSlash(url) {
    if (!url) {
      return url;
    }
    const hasProtocol = /^https?:\/\//i.test(url) ? url : `http://${url}`;
    return hasProtocol.endsWith("/") ? hasProtocol : `${hasProtocol}/`;
  }
  function performRequest(targetUrl, externalSignal) {
    return __async(this, null, function* () {
      const controller = new AbortController();
      const unlink = linkAbortSignals(externalSignal, controller);
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      try {
        const response = yield fetch(targetUrl, {
          signal: controller.signal,
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; IPTVClient/1.0)",
            Accept: "application/json, text/plain, */*"
          },
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return yield response.json();
      } finally {
        clearTimeout(timeoutId);
        unlink == null ? void 0 : unlink();
      }
    });
  }
  function fetchJson(_0) {
    return __async(this, arguments, function* (url, { signal } = {}) {
      var _a2, _b2, _c2;
      const errors = [];
      try {
        return yield performRequest(url, signal);
      } catch (error) {
        const err = error;
        if (err.name === "AbortError") {
          throw new Error("Tempo limite ao conectar ao servidor IPTV. Verifique a URL e tente novamente.");
        }
        errors.push(err);
      }
      const proxyUrl = buildProxyUrl(url);
      if (proxyUrl) {
        try {
          return yield performRequest(proxyUrl, signal);
        } catch (error) {
          const err = error;
          if (err.name === "AbortError") {
            throw new Error("Tempo limite ao conectar ao servidor IPTV (proxy). Tente novamente.");
          }
          errors.push(err);
        }
      }
      const primaryError = errors[0];
      const baseMessage = isLikelyCorsError(primaryError) ? "Falha ao conectar diretamente ao servidor IPTV (possível bloqueio de CORS)." : (_a2 = primaryError == null ? void 0 : primaryError.message) != null ? _a2 : "Falha desconhecida ao conectar ao servidor IPTV.";
      if (proxyUrl && errors.length > 1) {
        const proxyMessage = (_c2 = (_b2 = errors[1]) == null ? void 0 : _b2.message) != null ? _c2 : "Proxy retornou erro desconhecido.";
        throw new Error(
          `${baseMessage} Tentativa via proxy (${proxyUrl}) também falhou: ${proxyMessage}. Configure uma URL de proxy funcional em VITE_XTREAM_PROXY_URL ou revise o firewall do servidor.`
        );
      }
      if (isLikelyCorsError(primaryError) && !proxyUrl) {
        throw new Error(
          `${baseMessage} Configure uma URL de proxy reverso em VITE_XTREAM_PROXY_URL para contornar a restrição do navegador.`
        );
      }
      throw new Error(`Não foi possível conectar ao servidor IPTV (${baseMessage}). Confira a URL, usuário e senha.`);
    });
  }
  function authenticate(credentials) {
    return __async(this, null, function* () {
      var _a2, _b2;
      const url = createXtreamUrl(credentials.baseUrl, "player_api.php", {
        username: credentials.username,
        password: credentials.password
      });
      const data = yield fetchJson(url);
      if (!(data == null ? void 0 : data.user_info) || data.user_info.status !== "Active") {
        const reason = (_b2 = (_a2 = data == null ? void 0 : data.user_info) == null ? void 0 : _a2.message) != null ? _b2 : "Credenciais inválidas ou conta inativa.";
        throw new Error(reason);
      }
      return data;
    });
  }
  function fetchCategories(credentials, type) {
    return __async(this, null, function* () {
      const action = type === "movie" ? "get_vod_categories" : "get_series_categories";
      const url = createXtreamUrl(credentials.baseUrl, "player_api.php", {
        username: credentials.username,
        password: credentials.password,
        action
      });
      const data = yield fetchJson(url);
      return data.sort((a, b) => a.category_name.localeCompare(b.category_name));
    });
  }
  function fetchVodStreams(credentials, categoryId) {
    return __async(this, null, function* () {
      const url = createXtreamUrl(credentials.baseUrl, "player_api.php", {
        username: credentials.username,
        password: credentials.password,
        action: "get_vod_streams",
        category_id: categoryId
      });
      const data = yield fetchJson(url);
      return data;
    });
  }
  function fetchSeries(credentials, categoryId) {
    return __async(this, null, function* () {
      const url = createXtreamUrl(credentials.baseUrl, "player_api.php", {
        username: credentials.username,
        password: credentials.password,
        action: "get_series",
        category_id: categoryId
      });
      const data = yield fetchJson(url);
      return data;
    });
  }
  function fetchSeriesInfo(credentials, seriesId) {
    return __async(this, null, function* () {
      const url = createXtreamUrl(credentials.baseUrl, "player_api.php", {
        username: credentials.username,
        password: credentials.password,
        action: "get_series_info",
        series_id: String(seriesId)
      });
      const data = yield fetchJson(url);
      return data;
    });
  }
  const DEFAULT_BASE_URL = "http://";
  function normalizeCredentials(credentials) {
    const trimmedUrl = credentials.baseUrl.trim();
    const hasProtocol = /^https?:\/\//i.test(trimmedUrl);
    const baseUrl = trimmedUrl.length ? hasProtocol ? trimmedUrl : `http://${trimmedUrl}` : trimmedUrl;
    return {
      baseUrl,
      username: credentials.username.trim(),
      password: credentials.password.trim()
    };
  }
  function LoginScreen() {
    var _a2, _b2;
    const { setState, state } = useAuth();
    const queryClient2 = useQueryClient();
    const [form, setForm] = reactExports.useState({
      baseUrl: DEFAULT_BASE_URL,
      username: "",
      password: ""
    });
    const mutation = useMutation({
      mutationFn: authenticate,
      onMutate: () => {
        setState({ status: "authenticating" });
      },
      onSuccess: (_data, variables) => {
        setState({ status: "authenticated", credentials: variables });
        queryClient2.invalidateQueries();
      },
      onError: (error) => {
        setState({ status: "error", error: error.message });
      }
    });
    function handleSubmit(event) {
      event.preventDefault();
      const normalized = normalizeCredentials(form);
      setForm(normalized);
      mutation.mutate(normalized);
    }
    function handleChange(field) {
      return (event) => {
        const value = event.target.value;
        setForm((prev) => __spreadProps(__spreadValues({}, prev), { [field]: value }));
      };
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "login-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login-box", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "IPTV - LG webOS" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "URL do servidor",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              required: true,
              autoFocus: true,
              value: form.baseUrl,
              onChange: handleChange("baseUrl"),
              placeholder: "http://servidor.com:porta"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Usuário",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              required: true,
              value: form.username,
              onChange: handleChange("username")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Senha",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "password",
              required: true,
              value: form.password,
              onChange: handleChange("password")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: mutation.isPending, children: mutation.isPending ? "Conectando…" : "Entrar" }),
        (mutation.error || state.error) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error", children: (_b2 = (_a2 = mutation.error) == null ? void 0 : _a2.message) != null ? _b2 : state.error })
      ] })
    ] }) });
  }
  const STORAGE_KEY = "iptv_profiles";
  const ProfilesContext = reactExports.createContext(null);
  const DEFAULT_AVATARS = [
    "🦸‍♂️",
    "🦸‍♀️",
    "🦹‍♂️",
    "🦹‍♀️",
    "🤖",
    "👽",
    "🧙‍♂️",
    "🧙‍♀️",
    "🧚‍♂️",
    "🧚‍♀️",
    "🧛‍♂️",
    "🧛‍♀️",
    "🧞‍♂️",
    "🧞‍♀️",
    "🧝‍♂️",
    "🧝‍♀️"
  ];
  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("[profiles] Failed to load state", error);
    }
    const defaultProfile = {
      id: crypto.randomUUID(),
      name: "Perfil Principal",
      avatar: DEFAULT_AVATARS[0],
      createdAt: Date.now()
    };
    return {
      profiles: [defaultProfile],
      activeProfileId: null,
      // Sempre inicia sem perfil ativo para mostrar seletor
      profileData: {
        [defaultProfile.id]: {
          favorites: [],
          watchHistory: []
        }
      }
    };
  }
  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("[profiles] Failed to save state", error);
    }
  }
  function ProfileProvider({ children }) {
    var _a2;
    const [state, setState] = reactExports.useState(loadState);
    reactExports.useEffect(() => {
      saveState(state);
    }, [state]);
    const activeProfile = (_a2 = state.profiles.find((p2) => p2.id === state.activeProfileId)) != null ? _a2 : null;
    const selectProfile = reactExports.useCallback((id2, pin) => {
      const profile = state.profiles.find((p2) => p2.id === id2);
      if (!profile) {
        return false;
      }
      if (profile.pin && profile.pin !== pin) {
        return false;
      }
      setState((prev) => __spreadProps(__spreadValues({}, prev), { activeProfileId: id2 }));
      return true;
    }, [state.profiles]);
    const createProfile = reactExports.useCallback((name, avatar, pin) => {
      const newProfile = {
        id: crypto.randomUUID(),
        name: name.trim() || "Novo Perfil",
        avatar: avatar || DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)],
        pin: (pin == null ? void 0 : pin.trim()) || void 0,
        createdAt: Date.now()
      };
      setState((prev) => __spreadProps(__spreadValues({}, prev), {
        profiles: [...prev.profiles, newProfile],
        profileData: __spreadProps(__spreadValues({}, prev.profileData), {
          [newProfile.id]: {
            favorites: [],
            watchHistory: []
          }
        })
      }));
      return newProfile;
    }, []);
    const updateProfile = reactExports.useCallback((id2, updates) => {
      setState((prev) => __spreadProps(__spreadValues({}, prev), {
        profiles: prev.profiles.map(
          (p2) => p2.id === id2 ? __spreadValues(__spreadValues({}, p2), updates) : p2
        )
      }));
    }, []);
    const deleteProfile = reactExports.useCallback((id2) => {
      setState((prev) => {
        const remaining = prev.profiles.filter((p2) => p2.id !== id2);
        if (!remaining.length) {
          const defaultProfile = {
            id: crypto.randomUUID(),
            name: "Perfil Principal",
            avatar: DEFAULT_AVATARS[0],
            createdAt: Date.now()
          };
          return {
            profiles: [defaultProfile],
            activeProfileId: defaultProfile.id,
            profileData: {
              [defaultProfile.id]: {
                favorites: [],
                watchHistory: []
              }
            }
          };
        }
        const newActiveId = prev.activeProfileId === id2 ? remaining[0].id : prev.activeProfileId;
        const _a3 = prev.profileData, { [id2]: _removed } = _a3, restData = __objRest(_a3, [__restKey(id2)]);
        return {
          profiles: remaining,
          activeProfileId: newActiveId,
          profileData: restData
        };
      });
    }, []);
    const addFavorite = reactExports.useCallback((item) => {
      if (!state.activeProfileId) return;
      setState((prev) => {
        var _a3;
        const currentData = (_a3 = prev.profileData[state.activeProfileId]) != null ? _a3 : { favorites: [], watchHistory: [] };
        const exists = currentData.favorites.some((f2) => f2.streamId === item.streamId);
        if (exists) return prev;
        return __spreadProps(__spreadValues({}, prev), {
          profileData: __spreadProps(__spreadValues({}, prev.profileData), {
            [state.activeProfileId]: __spreadProps(__spreadValues({}, currentData), {
              favorites: [
                ...currentData.favorites,
                __spreadProps(__spreadValues({}, item), { addedAt: Date.now() })
              ]
            })
          })
        });
      });
    }, [state.activeProfileId]);
    const removeFavorite = reactExports.useCallback((streamId) => {
      if (!state.activeProfileId) return;
      setState((prev) => {
        var _a3;
        const currentData = (_a3 = prev.profileData[state.activeProfileId]) != null ? _a3 : { favorites: [], watchHistory: [] };
        return __spreadProps(__spreadValues({}, prev), {
          profileData: __spreadProps(__spreadValues({}, prev.profileData), {
            [state.activeProfileId]: __spreadProps(__spreadValues({}, currentData), {
              favorites: currentData.favorites.filter((f2) => f2.streamId !== streamId)
            })
          })
        });
      });
    }, [state.activeProfileId]);
    const isFavorite = reactExports.useCallback((streamId) => {
      var _a3;
      if (!state.activeProfileId) return false;
      const data = state.profileData[state.activeProfileId];
      return (_a3 = data == null ? void 0 : data.favorites.some((f2) => f2.streamId === streamId)) != null ? _a3 : false;
    }, [state.activeProfileId, state.profileData]);
    const getFavorites = reactExports.useCallback(() => {
      var _a3, _b2;
      if (!state.activeProfileId) return [];
      return (_b2 = (_a3 = state.profileData[state.activeProfileId]) == null ? void 0 : _a3.favorites) != null ? _b2 : [];
    }, [state.activeProfileId, state.profileData]);
    const updateWatchHistory = reactExports.useCallback((item) => {
      if (!state.activeProfileId) return;
      setState((prev) => {
        var _a3;
        const currentData = (_a3 = prev.profileData[state.activeProfileId]) != null ? _a3 : { favorites: [], watchHistory: [] };
        const existingIndex = currentData.watchHistory.findIndex((h) => h.streamId === item.streamId);
        let updatedHistory;
        if (existingIndex >= 0) {
          updatedHistory = [...currentData.watchHistory];
          updatedHistory[existingIndex] = __spreadProps(__spreadValues({}, item), { watchedAt: Date.now() });
        } else {
          updatedHistory = [
            __spreadProps(__spreadValues({}, item), { watchedAt: Date.now() }),
            ...currentData.watchHistory
          ].slice(0, 50);
        }
        return __spreadProps(__spreadValues({}, prev), {
          profileData: __spreadProps(__spreadValues({}, prev.profileData), {
            [state.activeProfileId]: __spreadProps(__spreadValues({}, currentData), {
              watchHistory: updatedHistory
            })
          })
        });
      });
    }, [state.activeProfileId]);
    const getWatchHistory = reactExports.useCallback(() => {
      var _a3, _b2;
      if (!state.activeProfileId) return [];
      return (_b2 = (_a3 = state.profileData[state.activeProfileId]) == null ? void 0 : _a3.watchHistory) != null ? _b2 : [];
    }, [state.activeProfileId, state.profileData]);
    const clearProfile = reactExports.useCallback(() => {
      setState((prev) => __spreadProps(__spreadValues({}, prev), { activeProfileId: null }));
    }, []);
    const logoutProfile = reactExports.useCallback(() => {
      setState((prev) => __spreadProps(__spreadValues({}, prev), { activeProfileId: null }));
    }, []);
    const clearFavorites = reactExports.useCallback(() => {
      if (!state.activeProfileId) return;
      setState((prev) => {
        var _a3;
        const currentData = (_a3 = prev.profileData[state.activeProfileId]) != null ? _a3 : { favorites: [], watchHistory: [] };
        return __spreadProps(__spreadValues({}, prev), {
          profileData: __spreadProps(__spreadValues({}, prev.profileData), {
            [state.activeProfileId]: __spreadProps(__spreadValues({}, currentData), {
              favorites: []
            })
          })
        });
      });
    }, [state.activeProfileId]);
    const clearWatchHistory = reactExports.useCallback(() => {
      if (!state.activeProfileId) return;
      setState((prev) => {
        var _a3;
        const currentData = (_a3 = prev.profileData[state.activeProfileId]) != null ? _a3 : { favorites: [], watchHistory: [] };
        return __spreadProps(__spreadValues({}, prev), {
          profileData: __spreadProps(__spreadValues({}, prev.profileData), {
            [state.activeProfileId]: __spreadProps(__spreadValues({}, currentData), {
              watchHistory: []
            })
          })
        });
      });
    }, [state.activeProfileId]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProfilesContext.Provider,
      {
        value: {
          profiles: state.profiles,
          activeProfile,
          selectProfile,
          createProfile,
          updateProfile,
          deleteProfile,
          addFavorite,
          removeFavorite,
          isFavorite,
          getFavorites,
          updateWatchHistory,
          getWatchHistory,
          clearProfile,
          logoutProfile,
          clearFavorites,
          clearWatchHistory
        },
        children
      }
    );
  }
  function useProfiles() {
    const context = reactExports.useContext(ProfilesContext);
    if (!context) {
      throw new Error("useProfiles must be used within ProfileProvider");
    }
    return context;
  }
  const KEY_MAP = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    Enter: "enter",
    " ": "enter",
    Backspace: "back",
    Escape: "back",
    MediaPlayPause: "play",
    MediaPlay: "play",
    MediaPause: "pause"
  };
  function useRemoteNavigation(handler) {
    reactExports.useEffect(() => {
      function onKeyDown(event) {
        const key = KEY_MAP[event.key];
        if (!key) {
          return;
        }
        event.preventDefault();
        handler({ key, originalEvent: event });
      }
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [handler]);
  }
  const CategoryList = reactExports.memo(function CategoryList2({
    categories,
    activeIndex,
    loading,
    focused,
    onFocus
  }) {
    if (loading && !categories.length) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "categories categories--loading", children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "category category--skeleton" }, index)) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "categories", "data-focused": focused, children: categories.map((category, index) => {
      var _a2;
      const isActive = index === activeIndex;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: isActive ? "category category--active" : "category",
          onClick: () => onFocus(index),
          "data-focused": focused && isActive,
          children: category.category_name
        },
        (_a2 = category.category_id) != null ? _a2 : index
      );
    }) });
  });
  const WINDOW_ROWS = 4;
  const MediaGrid = reactExports.memo(function MediaGrid2({
    items,
    columns,
    focusedIndex,
    hasFocus,
    loading,
    onSelect,
    onHighlight
  }) {
    const windowedItems = reactExports.useMemo(() => {
      if (!items.length) {
        return { offset: 0, list: [] };
      }
      const rows = Math.ceil(items.length / columns);
      const focusedRow = Math.floor(focusedIndex / columns);
      const startRow = Math.max(focusedRow - 1, 0);
      const endRow = Math.min(startRow + WINDOW_ROWS, rows);
      const startIndex = startRow * columns;
      const endIndex = Math.min(endRow * columns, items.length);
      return {
        offset: startIndex,
        list: items.slice(startIndex, endIndex)
      };
    }, [columns, focusedIndex, items]);
    if (loading && !items.length) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid grid--loading", children: Array.from({ length: columns * WINDOW_ROWS }, (_, index) => index).map((index) => /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "card card--skeleton" }, index)) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid", "data-focused": hasFocus, children: [
      windowedItems.list.map((item, index) => {
        const absoluteIndex = windowedItems.offset + index;
        const isFocused = absoluteIndex === focusedIndex && hasFocus;
        const handleSelect = () => {
          onSelect == null ? void 0 : onSelect(absoluteIndex, item);
        };
        const handlePointerEnter = () => {
          onHighlight == null ? void 0 : onHighlight(absoluteIndex, item);
        };
        const handleFocus = (_event) => {
          onHighlight == null ? void 0 : onHighlight(absoluteIndex, item);
        };
        const handleKeyDown = (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect == null ? void 0 : onSelect(absoluteIndex, item);
          }
        };
        const handleClick = (event) => {
          event.preventDefault();
          handleSelect();
        };
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "article",
          {
            className: isFocused ? "card card--focused" : "card",
            "data-index": absoluteIndex,
            role: "button",
            tabIndex: 0,
            onMouseEnter: handlePointerEnter,
            onFocus: handleFocus,
            onKeyDown: handleKeyDown,
            onClick: handleClick,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card__poster", children: item.poster ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.poster, alt: item.title, loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card__poster--placeholder", children: item.title.charAt(0) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card__meta", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "card__title", children: item.title }),
                item.meta && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "card__info", children: item.meta })
              ] })
            ]
          },
          item.id
        );
      }),
      !loading && !items.length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid__empty", children: "Nenhum conteúdo disponível" })
    ] });
  });
  const MediaDetails = reactExports.memo(function MediaDetails2({ item, type, loading, onPlay }) {
    const { isFavorite, addFavorite, removeFavorite } = useProfiles();
    const details = reactExports.useMemo(() => {
      if (!item) {
        return null;
      }
      if ("stream_id" in item) {
        return {
          title: item.name,
          poster: item.stream_icon,
          rating: item.rating,
          description: item.plot,
          releasedAt: item.added
        };
      }
      return {
        title: item.name,
        poster: item.cover,
        rating: item.rating,
        description: item.plot,
        releasedAt: item.last_modified
      };
    }, [item]);
    const handleFavoriteToggle = () => {
      if (!item || !details) return;
      const streamId = "stream_id" in item ? item.stream_id : item.series_id;
      const isCurrentlyFavorite = isFavorite(streamId);
      if (isCurrentlyFavorite) {
        removeFavorite(streamId);
      } else {
        addFavorite({
          streamId,
          title: details.title,
          poster: details.poster,
          type
        });
      }
    };
    const getFavoriteButtonText = () => {
      if (!item) return "";
      const streamId = "stream_id" in item ? item.stream_id : item.series_id;
      return isFavorite(streamId) ? "⭐ Remover dos Favoritos" : "☆ Adicionar aos Favoritos";
    };
    if (loading && !details) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "details details--loading", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "details__poster details__poster--skeleton" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "details__info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "details__line details__line--primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "details__line" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "details__line" })
        ] })
      ] });
    }
    if (!details) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "details", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Use as setas para navegar e selecione um título." }) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "details", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "details__poster", children: details.poster ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: details.poster, alt: details.title, loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "details__poster--placeholder", children: details.title.charAt(0) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "details__info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: details.title }),
        details.rating && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "details__rating", children: [
          "Nota: ",
          details.rating
        ] }),
        details.releasedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "details__meta", children: [
          "Atualizado em ",
          details.releasedAt
        ] }),
        details.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: details.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "details__type", children: type === "movie" ? "🎬 Filme" : "📺 Série" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "details__actions", children: [
          item && onPlay && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "details__play details__play--big", type: "button", onClick: () => onPlay(item), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "img", "aria-label": "play", style: { fontSize: "2rem", marginRight: "0.5rem" }, children: "▶️" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "1.25rem", fontWeight: 600 }, children: "Assistir" })
          ] }),
          item && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "details__favorite",
              type: "button",
              onClick: handleFavoriteToggle,
              title: getFavoriteButtonText(),
              children: getFavoriteButtonText()
            }
          )
        ] })
      ] })
    ] });
  });
  function PlayerOverlay({ streamId, title, type, credentials, onClose, item }) {
    const videoRef = reactExports.useRef(null);
    const [isPlaying, setIsPlaying] = reactExports.useState(false);
    const [showControls, setShowControls] = reactExports.useState(true);
    const [currentTime, setCurrentTime] = reactExports.useState(0);
    const [duration, setDuration] = reactExports.useState(0);
    const [volume, setVolume] = reactExports.useState(1);
    const [error, setError] = reactExports.useState(null);
    const hideControlsTimer = reactExports.useRef(null);
    const { updateWatchHistory } = useProfiles();
    const streamUrl = buildStreamUrl(credentials, streamId, type, item);
    reactExports.useEffect(() => {
      const video = videoRef.current;
      if (!video) return;
      function handleTimeUpdate() {
        setCurrentTime(video.currentTime);
      }
      function handleDurationChange() {
        setDuration(video.duration);
      }
      function handlePlay() {
        setIsPlaying(true);
      }
      function handlePause() {
        setIsPlaying(false);
      }
      function handleError(e) {
        console.error("[PlayerOverlay] Video error:", video.error);
        setError("Erro ao carregar o vídeo. Verifique a conexão ou tente outro título.");
      }
      function handleLoadedMetadata() {
      }
      function handleCanPlay() {
        video.play().catch((err) => {
          console.error("[PlayerOverlay] Autoplay failed:", err);
        });
      }
      function handleSeeking() {
      }
      function handleSeeked() {
      }
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("durationchange", handleDurationChange);
      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);
      video.addEventListener("error", handleError);
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("seeking", handleSeeking);
      video.addEventListener("seeked", handleSeeked);
      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("durationchange", handleDurationChange);
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("error", handleError);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("seeking", handleSeeking);
        video.removeEventListener("seeked", handleSeeked);
      };
    }, []);
    reactExports.useEffect(() => {
      if (showControls) {
        if (hideControlsTimer.current) {
          clearTimeout(hideControlsTimer.current);
        }
        hideControlsTimer.current = setTimeout(() => {
          if (isPlaying) {
            setShowControls(false);
          }
        }, 3e3);
      }
      return () => {
        if (hideControlsTimer.current) {
          clearTimeout(hideControlsTimer.current);
        }
      };
    }, [showControls, isPlaying]);
    reactExports.useEffect(() => {
      return () => {
        if (videoRef.current && duration > 0 && currentTime > 10) {
          updateWatchHistory({
            streamId,
            title,
            type,
            lastPosition: currentTime,
            duration
          });
        }
      };
    }, [streamId, title, type, currentTime, duration, updateWatchHistory]);
    const togglePlayPause = reactExports.useCallback(() => {
      const video = videoRef.current;
      if (!video) return;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }, []);
    const seek = reactExports.useCallback((seconds) => {
      const video = videoRef.current;
      if (!video) return;
      if (!video.duration || isNaN(video.duration) || !isFinite(video.duration)) {
        console.warn("[PlayerOverlay] Cannot seek: video duration not available");
        return;
      }
      if (video.seekable.length === 0) {
        console.warn("[PlayerOverlay] Cannot seek: video stream does not support seeking");
        return;
      }
      const currentPos = video.currentTime;
      const newTime = Math.max(0, Math.min(currentPos + seconds, video.duration));
      const seekableEnd = video.seekable.end(video.seekable.length - 1);
      const targetTime = Math.min(newTime, seekableEnd);
      video.currentTime = targetTime;
    }, []);
    const adjustVolume = reactExports.useCallback((delta) => {
      const video = videoRef.current;
      if (!video) return;
      const newVolume = Math.max(0, Math.min(volume + delta, 1));
      video.volume = newVolume;
      setVolume(newVolume);
    }, [volume]);
    const handleKeyDown = reactExports.useCallback((event) => {
      setShowControls(true);
      switch (event.key) {
        case " ":
        case "Enter":
        case "MediaPlayPause":
          event.preventDefault();
          togglePlayPause();
          break;
        case "ArrowLeft":
          event.preventDefault();
          seek(-10);
          break;
        case "ArrowRight":
          event.preventDefault();
          seek(10);
          break;
        case "ArrowUp":
          event.preventDefault();
          adjustVolume(0.1);
          break;
        case "ArrowDown":
          event.preventDefault();
          adjustVolume(-0.1);
          break;
        case "Escape":
        case "Back":
        case "Backspace":
          event.preventDefault();
          onClose();
          break;
      }
    }, [togglePlayPause, seek, adjustVolume, onClose]);
    function formatTime2(seconds) {
      const h = Math.floor(seconds / 3600);
      const m2 = Math.floor(seconds % 3600 / 60);
      const s = Math.floor(seconds % 60);
      if (h > 0) {
        return `${h}:${m2.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
      }
      return `${m2}:${s.toString().padStart(2, "0")}`;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "player-overlay",
        onKeyDown: handleKeyDown,
        tabIndex: 0,
        onMouseMove: () => setShowControls(true),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "video",
            {
              ref: videoRef,
              className: "player-overlay__video",
              src: streamUrl,
              autoPlay: true,
              controls: false,
              playsInline: true,
              preload: "auto",
              onClick: togglePlayPause
            }
          ),
          error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "player-overlay__error", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: error }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, children: "Voltar" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: showControls ? "player-overlay__controls" : "player-overlay__controls player-overlay__controls--hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "player-overlay__header", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "player-overlay__close", children: "✕" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "player-overlay__progress", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "player-overlay__progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "player-overlay__progress-fill",
                  style: { width: `${duration > 0 ? currentTime / duration * 100 : 0}%` }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "player-overlay__time", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatTime2(currentTime) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatTime2(duration) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "player-overlay__buttons", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => seek(-10), children: "⏪ 10s" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: togglePlayPause, children: isPlaying ? "⏸️ Pausar" : "▶️ Play" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => seek(10), children: "⏩ 10s" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "player-overlay__volume", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => adjustVolume(-0.1), children: "🔉" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "player-overlay__volume-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "player-overlay__volume-fill",
                    style: { width: `${volume * 100}%` }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => adjustVolume(0.1), children: "🔊" })
              ] })
            ] })
          ] })
        ]
      }
    );
  }
  function buildStreamUrl(credentials, streamId, type, item) {
    const base = credentials.baseUrl.replace(/\/$/, "");
    let extension = "mp4";
    if (item && "container_extension" in item && item.container_extension) {
      extension = item.container_extension;
    }
    let directUrl;
    if (type === "movie") {
      directUrl = `${base}/movie/${credentials.username}/${credentials.password}/${streamId}.${extension}`;
    } else {
      directUrl = `${base}/series/${credentials.username}/${credentials.password}/${streamId}.${extension}`;
    }
    const proxyUrl = "http://localhost:8787/proxy?url=";
    {
      return `${proxyUrl}${encodeURIComponent(directUrl)}`;
    }
  }
  function SeriesSelector({ seriesId, seriesTitle, credentials, onEpisodeSelect, onClose }) {
    const [selectedSeason, setSelectedSeason] = reactExports.useState(null);
    const { data: seriesInfo, isLoading, error } = useQuery({
      queryKey: ["series-info", seriesId],
      queryFn: () => fetchSeriesInfo(credentials, seriesId),
      staleTime: 1e3 * 60 * 10
    });
    const seasons = seriesInfo ? Object.keys(seriesInfo.episodes).sort((a, b) => Number(a) - Number(b)) : [];
    reactExports.useEffect(() => {
      if (seasons.length > 0 && !selectedSeason) {
        setSelectedSeason(seasons[0]);
      }
    }, [seasons, selectedSeason]);
    const handleEpisodeClick = reactExports.useCallback((episode) => {
      const episodeTitle = `${seriesTitle} - T${selectedSeason} E${episode.episode_num}: ${episode.title}`;
      onEpisodeSelect(episode.id, episodeTitle, episode.container_extension);
    }, [seriesTitle, selectedSeason, onEpisodeSelect]);
    if (isLoading) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "series-selector", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "series-selector__header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: seriesTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "series-selector__close", children: "✕" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "series-selector__loading", children: "Carregando temporadas..." })
      ] });
    }
    if (error || !seriesInfo) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "series-selector", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "series-selector__header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: seriesTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "series-selector__close", children: "✕" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "series-selector__error", children: "Erro ao carregar episódios. Tente novamente." })
      ] });
    }
    const episodes = selectedSeason ? seriesInfo.episodes[selectedSeason] || [] : [];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "series-selector", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "series-selector__header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: seriesInfo.info.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "series-selector__close", children: "✕" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "series-selector__content", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "series-selector__seasons", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Temporadas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "series-selector__season-list", children: seasons.map((season) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: `series-selector__season ${selectedSeason === season ? "series-selector__season--active" : ""}`,
              onClick: () => setSelectedSeason(season),
              children: [
                "Temporada ",
                season
              ]
            },
            season
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "series-selector__episodes", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
            "Episódios - Temporada ",
            selectedSeason
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "series-selector__episode-list", children: episodes.map((episode) => {
            var _a2;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "series-selector__episode",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "series-selector__episode-info", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "series-selector__episode-num", children: [
                      "E",
                      episode.episode_num
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "series-selector__episode-title", children: episode.title }),
                    ((_a2 = episode.info) == null ? void 0 : _a2.duration) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "series-selector__episode-duration", children: episode.info.duration })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "series-selector__episode-play",
                      onClick: () => handleEpisodeClick(episode),
                      children: "▶ Assistir"
                    }
                  )
                ]
              },
              episode.id
            );
          }) })
        ] })
      ] })
    ] });
  }
  function testConnection(credentials) {
    return __async(this, null, function* () {
      try {
        const startTime = Date.now();
        const response = yield fetch(`${credentials.baseUrl}/player_api.php?username=${credentials.username}&password=${credentials.password}&action=get_server_info`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          signal: AbortSignal.timeout(1e4)
          // 10 segundos de timeout
        });
        const latency = Date.now() - startTime;
        if (!response.ok) {
          return {
            success: false,
            error: `Erro HTTP ${response.status}: ${response.statusText}`,
            latency
          };
        }
        const data = yield response.json();
        if (data && (data.server_info || data.user_info)) {
          return {
            success: true,
            latency
          };
        } else {
          return {
            success: false,
            error: "Resposta inválida do servidor",
            latency
          };
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            return {
              success: false,
              error: "Timeout - Servidor não respondeu em 10 segundos"
            };
          }
          return {
            success: false,
            error: error.message
          };
        }
        return {
          success: false,
          error: "Erro desconhecido"
        };
      }
    });
  }
  function ManagementModal({ isOpen, onClose }) {
    var _a2, _b2, _c2, _d2, _e2, _f;
    const { state: authState, logout, updateCredentials } = useAuth();
    const { activeProfile, clearProfile, clearFavorites, clearWatchHistory, getFavorites, getWatchHistory } = useProfiles();
    const [activeTab, setActiveTab] = reactExports.useState("favorites");
    const [isTestingConnection, setIsTestingConnection] = reactExports.useState(false);
    const [connectionResult, setConnectionResult] = reactExports.useState(null);
    const [showLogoutConfirm, setShowLogoutConfirm] = reactExports.useState(false);
    const [editingCredentials, setEditingCredentials] = reactExports.useState(false);
    const [newUrl, setNewUrl] = reactExports.useState(((_a2 = authState.credentials) == null ? void 0 : _a2.baseUrl) || "");
    const [newUsername, setNewUsername] = reactExports.useState(((_b2 = authState.credentials) == null ? void 0 : _b2.username) || "");
    const [newPassword, setNewPassword] = reactExports.useState("");
    if (!isOpen) return null;
    const handleClearFavorites = () => {
      const favoritesCount = getFavorites().length;
      if (favoritesCount === 0) {
        alert("Não há favoritos para limpar.");
        return;
      }
      if (confirm(`Tem certeza que deseja limpar todos os ${favoritesCount} favoritos? Esta ação não pode ser desfeita.`)) {
        clearFavorites();
        alert("Favoritos limpos com sucesso!");
      }
    };
    const handleClearHistory = () => {
      const historyCount = getWatchHistory().length;
      if (historyCount === 0) {
        alert("Não há histórico para limpar.");
        return;
      }
      if (confirm(`Tem certeza que deseja limpar todo o histórico (${historyCount} itens)? Esta ação não pode ser desfeita.`)) {
        clearWatchHistory();
        alert("Histórico limpo com sucesso!");
      }
    };
    const handleTestConnection = () => __async(this, null, function* () {
      if (!authState.credentials) return;
      setIsTestingConnection(true);
      setConnectionResult(null);
      try {
        const result = yield testConnection(authState.credentials);
        if (result.success) {
          setConnectionResult("✅ Conexão OK - Servidor respondendo normalmente");
        } else {
          setConnectionResult(`❌ Erro na conexão: ${result.error}`);
        }
      } catch (error) {
        setConnectionResult(`❌ Erro inesperado: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
      } finally {
        setIsTestingConnection(false);
      }
    });
    const handleUpdateCredentials = () => {
      if (!newUrl.trim() || !newUsername.trim() || !newPassword.trim()) {
        alert("Todos os campos são obrigatórios");
        return;
      }
      const newCredentials = {
        baseUrl: newUrl.trim(),
        username: newUsername.trim(),
        password: newPassword.trim()
      };
      updateCredentials == null ? void 0 : updateCredentials(newCredentials);
      setEditingCredentials(false);
      setNewPassword("");
      alert("Credenciais atualizadas com sucesso!");
    };
    const handleLogout = () => {
      clearProfile();
      logout();
      onClose();
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal modal--large", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal__header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Gerenciamento" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "modal__close", onClick: onClose, type: "button", children: "×" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal__tabs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: activeTab === "favorites" ? "modal__tab modal__tab--active" : "modal__tab",
            onClick: () => setActiveTab("favorites"),
            type: "button",
            children: "📋 Dados do Perfil"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: activeTab === "connection" ? "modal__tab modal__tab--active" : "modal__tab",
            onClick: () => setActiveTab("connection"),
            type: "button",
            children: "🔧 Conexão"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: activeTab === "account" ? "modal__tab modal__tab--active" : "modal__tab",
            onClick: () => setActiveTab("account"),
            type: "button",
            children: "👤 Conta"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal__content", children: [
        activeTab === "favorites" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "management-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
            "Dados do Perfil: ",
            activeProfile == null ? void 0 : activeProfile.name
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "management-section__description", children: "Gerencie os dados salvos neste perfil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "management-actions", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "management-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "management-card__info", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "🌟 Favoritos" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Remove todos os itens da sua lista de favoritos" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "data-count", children: [
                  getFavorites().length,
                  " itens salvos"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "btn btn--danger",
                  onClick: handleClearFavorites,
                  type: "button",
                  disabled: getFavorites().length === 0,
                  children: "Limpar Favoritos"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "management-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "management-card__info", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "📺 Histórico" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Remove todo o histórico de reprodução e posições salvas" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "data-count", children: [
                  getWatchHistory().length,
                  " itens no histórico"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "btn btn--danger",
                  onClick: handleClearHistory,
                  type: "button",
                  disabled: getWatchHistory().length === 0,
                  children: "Limpar Histórico"
                }
              )
            ] })
          ] })
        ] }),
        activeTab === "connection" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "management-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Teste de Conexão" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "management-section__description", children: "Verifique se o servidor IPTV está respondendo corretamente" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connection-test", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connection-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Servidor:" }),
                " ",
                (_c2 = authState.credentials) == null ? void 0 : _c2.baseUrl
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Usuário:" }),
                " ",
                (_d2 = authState.credentials) == null ? void 0 : _d2.username
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "btn btn--primary",
                onClick: handleTestConnection,
                disabled: isTestingConnection,
                type: "button",
                children: isTestingConnection ? "🔄 Testando..." : "🔗 Testar Conexão"
              }
            ),
            connectionResult && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `connection-result ${connectionResult.includes("✅") ? "success" : "error"}`, children: connectionResult })
          ] })
        ] }),
        activeTab === "account" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "management-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Configurações da Conta" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "management-section__description", children: "Gerencie suas credenciais de acesso" }),
          !editingCredentials ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "account-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "account-field", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "URL do Servidor:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: (_e2 = authState.credentials) == null ? void 0 : _e2.baseUrl })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "account-field", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Usuário:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: (_f = authState.credentials) == null ? void 0 : _f.username })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "account-field", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Senha:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "••••••••" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "account-actions", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "btn btn--secondary",
                  onClick: () => {
                    var _a3, _b3;
                    setEditingCredentials(true);
                    setNewUrl(((_a3 = authState.credentials) == null ? void 0 : _a3.baseUrl) || "");
                    setNewUsername(((_b3 = authState.credentials) == null ? void 0 : _b3.username) || "");
                    setNewPassword("");
                  },
                  type: "button",
                  children: "✏️ Editar Credenciais"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "btn btn--danger",
                  onClick: () => setShowLogoutConfirm(true),
                  type: "button",
                  children: "🚪 Sair da Conta"
                }
              )
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "credential-edit", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              "URL do Servidor",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "url",
                  value: newUrl,
                  onChange: (e) => setNewUrl(e.target.value),
                  placeholder: "http://servidor.com:8080"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              "Usuário",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: newUsername,
                  onChange: (e) => setNewUsername(e.target.value),
                  placeholder: "seu_usuario"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              "Nova Senha",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "password",
                  value: newPassword,
                  onChange: (e) => setNewPassword(e.target.value),
                  placeholder: "Digite a nova senha"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "credential-actions", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "btn btn--secondary",
                  onClick: () => {
                    setEditingCredentials(false);
                    setNewPassword("");
                  },
                  type: "button",
                  children: "Cancelar"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "btn btn--primary",
                  onClick: handleUpdateCredentials,
                  type: "button",
                  children: "Salvar"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      showLogoutConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-overlay", onClick: () => setShowLogoutConfirm(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal modal--small", onClick: (e) => e.stopPropagation(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Confirmar Saída" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tem certeza que deseja sair da conta? Você precisará fazer login novamente." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal__actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "btn btn--secondary",
              onClick: () => setShowLogoutConfirm(false),
              type: "button",
              children: "Cancelar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "btn btn--danger",
              onClick: handleLogout,
              type: "button",
              children: "Sair"
            }
          )
        ] })
      ] }) })
    ] }) });
  }
  function FavoritesModal({ isOpen, onClose, onItemSelect }) {
    const { getFavorites, removeFavorite, activeProfile } = useProfiles();
    const { state: authState } = useAuth();
    const [sortBy, setSortBy] = reactExports.useState("recent");
    if (!isOpen) return null;
    const favorites = getFavorites();
    const sortedFavorites = [...favorites].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "type":
          return a.type.localeCompare(b.type);
        case "recent":
        default:
          return b.addedAt - a.addedAt;
      }
    });
    const handleItemClick = (favorite) => {
      onItemSelect({
        streamId: favorite.streamId,
        title: favorite.title,
        type: favorite.type
      });
      onClose();
    };
    const handleRemoveFavorite = (streamId, event) => {
      event.stopPropagation();
      if (confirm("Remover este item dos favoritos?")) {
        removeFavorite(streamId);
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal modal--large favorites-modal", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal__header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "favorites-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "⭐ Meus Favoritos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "favorites-count", children: [
            favorites.length,
            " ",
            favorites.length === 1 ? "item" : "itens"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "modal__close", onClick: onClose, type: "button", children: "×" })
      ] }),
      favorites.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "favorites-empty", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "favorites-empty__icon", children: "⭐" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Nenhum favorito ainda" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Adicione 🎬 filmes e 📺 séries aos seus favoritos para encontrá-los facilmente aqui." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn--primary", onClick: onClose, type: "button", children: "Explorar Catálogo" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "favorites-controls", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "favorites-sort", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Ordenar por:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: sortBy,
                onChange: (e) => setSortBy(e.target.value),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "recent", children: "Adicionados recentemente" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "name", children: "Nome (A-Z)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "type", children: "Tipo (🎬 Filmes/📺 Séries)" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "favorites-profile", children: [
            "Perfil: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: activeProfile == null ? void 0 : activeProfile.name })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "favorites-grid", children: sortedFavorites.map((favorite) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "favorite-item",
            onClick: () => handleItemClick(favorite),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "favorite-item__poster", children: favorite.poster ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: favorite.poster,
                  alt: favorite.title,
                  onError: (e) => {
                    e.currentTarget.style.display = "none";
                  }
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "favorite-item__poster-placeholder", children: favorite.type === "movie" ? "🎬" : "📺" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "favorite-item__info", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "favorite-item__title", children: favorite.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "favorite-item__meta", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `favorite-item__type favorite-item__type--${favorite.type}`, children: favorite.type === "movie" ? "🎬 Filme" : "📺 Série" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "favorite-item__date", children: new Date(favorite.addedAt).toLocaleDateString("pt-BR") })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "favorite-item__remove",
                  onClick: (e) => handleRemoveFavorite(favorite.streamId, e),
                  title: "Remover dos favoritos",
                  type: "button",
                  children: "❌"
                }
              )
            ]
          },
          favorite.streamId
        )) })
      ] })
    ] }) });
  }
  function GlobalSearch({ credentials, onClose, onItemSelect }) {
    const [filters, setFilters] = reactExports.useState({
      query: "",
      category: "all",
      minRating: 0,
      type: "all"
    });
    const [inputValue, setInputValue] = reactExports.useState("");
    reactExports.useEffect(() => {
      const timer = setTimeout(() => {
        setFilters((prev) => __spreadProps(__spreadValues({}, prev), { query: inputValue }));
      }, 300);
      return () => clearTimeout(timer);
    }, [inputValue]);
    const { data: movieCategories = [] } = useQuery({
      queryKey: ["categories", credentials.baseUrl, credentials.username, "movie"],
      queryFn: () => fetchCategories(credentials, "movie"),
      staleTime: 1e3 * 60 * 10
    });
    const { data: seriesCategories = [] } = useQuery({
      queryKey: ["categories", credentials.baseUrl, credentials.username, "series"],
      queryFn: () => fetchCategories(credentials, "series"),
      staleTime: 1e3 * 60 * 10
    });
    const { data: allMovies = [], isLoading: moviesLoading } = useQuery({
      queryKey: ["all-movies", credentials.baseUrl, credentials.username],
      queryFn: () => fetchVodStreams(credentials),
      staleTime: 1e3 * 60 * 10,
      enabled: filters.type === "all" || filters.type === "movie"
    });
    const { data: allSeries = [], isLoading: seriesLoading } = useQuery({
      queryKey: ["all-series", credentials.baseUrl, credentials.username],
      queryFn: () => fetchSeries(credentials),
      staleTime: 1e3 * 60 * 10,
      enabled: filters.type === "all" || filters.type === "series"
    });
    const allCategories = reactExports.useMemo(() => {
      const combined = [...movieCategories, ...seriesCategories];
      const uniqueMap = /* @__PURE__ */ new Map();
      combined.forEach((cat) => {
        if (!uniqueMap.has(cat.category_id)) {
          uniqueMap.set(cat.category_id, cat);
        }
      });
      return Array.from(uniqueMap.values()).sort(
        (a, b) => a.category_name.localeCompare(b.category_name)
      );
    }, [movieCategories, seriesCategories]);
    const filteredResults = reactExports.useMemo(() => {
      let results = [];
      if (filters.type === "all" || filters.type === "movie") {
        results.push(...allMovies.map((item) => ({ item, type: "movie" })));
      }
      if (filters.type === "all" || filters.type === "series") {
        results.push(...allSeries.map((item) => ({ item, type: "series" })));
      }
      results = results.filter(({ item }) => {
        if (filters.query) {
          const query = filters.query.toLowerCase();
          const name = item.name.toLowerCase();
          if (!name.includes(query)) return false;
        }
        if (filters.category !== "all") {
          if (item.category_id !== filters.category) return false;
        }
        if (filters.minRating > 0) {
          const rating = parseFloat(item.rating || "0");
          if (rating < filters.minRating) return false;
        }
        return true;
      });
      results.sort((a, b) => a.item.name.localeCompare(b.item.name));
      return results;
    }, [allMovies, allSeries, filters]);
    const handleKeyDown = reactExports.useCallback((event) => {
      if (event.key === "Escape") {
        onClose();
      }
    }, [onClose]);
    const loading = moviesLoading || seriesLoading;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "global-search", onKeyDown: handleKeyDown, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "global-search__overlay", onClick: onClose }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "global-search__modal", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "global-search__header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Buscar Conteúdo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "global-search__close", children: "✕" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "global-search__filters", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              className: "global-search__input",
              placeholder: "Digite o nome do 🎬 filme ou 📺 série...",
              value: inputValue,
              onChange: (e) => setInputValue(e.target.value),
              autoFocus: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "global-search__filter-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "global-search__select",
                value: filters.type,
                onChange: (e) => setFilters((prev) => __spreadProps(__spreadValues({}, prev), { type: e.target.value })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "📺🎬 Todos os tipos" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "movie", children: "🎬 Filmes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "series", children: "📺 Séries" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "global-search__select",
                value: filters.category,
                onChange: (e) => setFilters((prev) => __spreadProps(__spreadValues({}, prev), { category: e.target.value })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todas as categorias" }),
                  allCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat.category_id, children: cat.category_name }, cat.category_id))
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "global-search__select",
                value: filters.minRating,
                onChange: (e) => setFilters((prev) => __spreadProps(__spreadValues({}, prev), { minRating: Number(e.target.value) })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "0", children: "Qualquer nota" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "5", children: "5+ ⭐" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "6", children: "6+ ⭐" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "7", children: "7+ ⭐" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "8", children: "8+ ⭐" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "9", children: "9+ ⭐" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "global-search__results", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "global-search__loading", children: "Carregando..." }) : filteredResults.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "global-search__empty", children: filters.query ? "Nenhum resultado encontrado" : "Digite algo para buscar" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "global-search__count", children: [
            filteredResults.length,
            " resultado",
            filteredResults.length !== 1 ? "s" : "",
            " encontrado",
            filteredResults.length !== 1 ? "s" : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "global-search__list", children: filteredResults.map(({ item, type }, index) => {
            const isVod2 = "stream_id" in item;
            const poster = isVod2 ? item.stream_icon : item.cover;
            const id2 = isVod2 ? item.stream_id : item.series_id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "global-search__item",
                onClick: () => onItemSelect(item, type),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "global-search__item-poster", children: poster ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: poster, alt: item.name, loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "global-search__item-placeholder", children: item.name.charAt(0) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "global-search__item-info", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: item.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "global-search__item-meta", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "global-search__item-type", children: type === "movie" ? "🎬 Filme" : "📺 Série" }),
                      item.rating && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "global-search__item-rating", children: [
                        "⭐ ",
                        item.rating
                      ] })
                    ] })
                  ] })
                ]
              },
              `${type}-${id2}-${index}`
            );
          }) })
        ] }) })
      ] })
    ] });
  }
  const BREAKPOINTS = [
    { width: 3840, columns: 8 },
    { width: 2560, columns: 7 },
    { width: 1920, columns: 6 },
    { width: 1280, columns: 5 },
    { width: 1024, columns: 4 },
    { width: 768, columns: 3 }
  ];
  const DEFAULT_COLUMNS = 3;
  function useResponsiveColumns() {
    const [columns, setColumns] = reactExports.useState(DEFAULT_COLUMNS);
    reactExports.useEffect(() => {
      function update() {
        var _a2;
        const width = window.innerWidth;
        const matched = BREAKPOINTS.find((breakpoint) => width >= breakpoint.width);
        setColumns((_a2 = matched == null ? void 0 : matched.columns) != null ? _a2 : DEFAULT_COLUMNS);
      }
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }, []);
    return { columns };
  }
  const TABS = [
    { label: "🎬 Filmes", type: "movie" },
    { label: "📺 Séries", type: "series" }
  ];
  const INITIAL_SELECTION = {
    focusedPanel: "tabs",
    categoryIndex: 0,
    itemIndex: 0
  };
  function Dashboard() {
    var _a2, _b2, _c2, _d2, _e2, _f;
    const {
      state: { credentials },
      logout
    } = useAuth();
    const { activeProfile, logoutProfile } = useProfiles();
    const [activeTab, setActiveTab] = reactExports.useState("movie");
    const [selection, setSelection] = reactExports.useState(INITIAL_SELECTION);
    const [playingItem, setPlayingItem] = reactExports.useState(null);
    const [selectedSeries, setSelectedSeries] = reactExports.useState(null);
    const [showSearch, setShowSearch] = reactExports.useState(false);
    const [showManagement, setShowManagement] = reactExports.useState(false);
    const [showFavorites, setShowFavorites] = reactExports.useState(false);
    const [playingEpisode, setPlayingEpisode] = reactExports.useState(null);
    const { columns } = useResponsiveColumns();
    const queryClient2 = useQueryClient();
    const categoriesQuery = useQuery({
      queryKey: ["categories", credentials == null ? void 0 : credentials.baseUrl, credentials == null ? void 0 : credentials.username, activeTab],
      queryFn: () => __async(this, null, function* () {
        if (!credentials) {
          throw new Error("Credenciais ausentes");
        }
        console.debug("[dashboard] fetch categories", { tab: activeTab, base: credentials.baseUrl });
        return fetchCategories(credentials, activeTab);
      }),
      enabled: Boolean(credentials)
    });
    const categories = (_a2 = categoriesQuery.data) != null ? _a2 : [];
    const activeCategoryId = (_b2 = categories[selection.categoryIndex]) == null ? void 0 : _b2.category_id;
    const itemsQuery = useQuery({
      queryKey: ["items", activeTab, activeCategoryId],
      queryFn: () => __async(this, null, function* () {
        if (!credentials) {
          throw new Error("Credenciais ausentes");
        }
        console.debug("[dashboard] fetch items", { tab: activeTab, category: activeCategoryId });
        if (activeTab === "movie") {
          const vod = yield fetchVodStreams(credentials, activeCategoryId);
          return vod;
        }
        const series = yield fetchSeries(credentials, activeCategoryId);
        return series;
      }),
      enabled: Boolean(credentials) && categories.length > 0,
      staleTime: 1e3 * 60 * 10
    });
    const items = (_c2 = itemsQuery.data) != null ? _c2 : [];
    const focusedItem = items[selection.itemIndex];
    const categoriesError = categoriesQuery.error instanceof Error ? categoriesQuery.error : null;
    const itemsError = itemsQuery.error instanceof Error ? itemsQuery.error : null;
    const errorMessage = (_e2 = (_d2 = categoriesError == null ? void 0 : categoriesError.message) != null ? _d2 : itemsError == null ? void 0 : itemsError.message) != null ? _e2 : null;
    useRemoteNavigation(
      reactExports.useCallback(
        ({ key }) => {
          setSelection((prev) => {
            if (key === "back") {
              return __spreadProps(__spreadValues({}, INITIAL_SELECTION), { focusedPanel: "tabs" });
            }
            if (key === "left") {
              if (prev.focusedPanel === "grid") {
                if (prev.itemIndex % columns === 0) {
                  return __spreadProps(__spreadValues({}, prev), { focusedPanel: "categories" });
                }
                return __spreadProps(__spreadValues({}, prev), { itemIndex: Math.max(prev.itemIndex - 1, 0) });
              }
              if (prev.focusedPanel === "categories") {
                return __spreadProps(__spreadValues({}, prev), { focusedPanel: "tabs" });
              }
            }
            if (key === "right") {
              if (prev.focusedPanel === "tabs") {
                return __spreadProps(__spreadValues({}, prev), { focusedPanel: categories.length ? "categories" : "tabs" });
              }
              if (prev.focusedPanel === "categories") {
                if (!items.length) {
                  return prev;
                }
                return __spreadProps(__spreadValues({}, prev), { focusedPanel: "grid" });
              }
              if (prev.focusedPanel === "grid") {
                return __spreadProps(__spreadValues({}, prev), { itemIndex: Math.min(prev.itemIndex + 1, Math.max(items.length - 1, 0)) });
              }
            }
            if (key === "up") {
              if (prev.focusedPanel === "grid") {
                return __spreadProps(__spreadValues({}, prev), {
                  itemIndex: Math.max(prev.itemIndex - columns, 0)
                });
              }
              if (prev.focusedPanel === "categories") {
                return __spreadProps(__spreadValues({}, prev), {
                  categoryIndex: Math.max(prev.categoryIndex - 1, 0)
                });
              }
              if (prev.focusedPanel === "tabs") {
                return __spreadProps(__spreadValues({}, prev), {
                  focusedPanel: "grid"
                });
              }
            }
            if (key === "down") {
              if (prev.focusedPanel === "tabs") {
                return __spreadProps(__spreadValues({}, prev), { focusedPanel: categories.length ? "categories" : "tabs" });
              }
              if (prev.focusedPanel === "categories") {
                return __spreadProps(__spreadValues({}, prev), {
                  categoryIndex: Math.min(prev.categoryIndex + 1, Math.max(categories.length - 1, 0))
                });
              }
              if (prev.focusedPanel === "grid") {
                return __spreadProps(__spreadValues({}, prev), {
                  itemIndex: Math.min(prev.itemIndex + columns, Math.max(items.length - 1, 0))
                });
              }
            }
            if (key === "enter") {
              if (prev.focusedPanel === "grid" && focusedItem) {
                if (activeTab === "series" && "series_id" in focusedItem) {
                  setSelectedSeries(focusedItem);
                } else {
                  setPlayingItem(focusedItem);
                }
              }
              return prev;
            }
            return prev;
          });
        },
        [categories.length, columns, items.length, focusedItem, activeTab]
      )
    );
    const handleTabChange = reactExports.useCallback(
      (type) => {
        setActiveTab(type);
        setSelection(__spreadProps(__spreadValues({}, INITIAL_SELECTION), { focusedPanel: "categories" }));
        prefetchCategories(queryClient2, credentials, type);
      },
      [credentials, queryClient2]
    );
    const handleCategoryFocus = reactExports.useCallback((index) => {
      setSelection((prev) => __spreadProps(__spreadValues({}, prev), { categoryIndex: index, itemIndex: 0 }));
    }, []);
    const derivedItems = reactExports.useMemo(() => {
      return items.map((item) => ({
        id: isVod(item) ? item.stream_id : item.series_id,
        title: item.name,
        poster: isVod(item) ? item.stream_icon : item.cover,
        meta: item.rating,
        raw: item
      }));
    }, [items]);
    const loading = categoriesQuery.isPending || itemsQuery.isPending;
    const clampItemIndex = reactExports.useCallback(
      (index) => {
        if (!items.length) {
          return 0;
        }
        return Math.min(Math.max(index, 0), items.length - 1);
      },
      [items.length]
    );
    const handleGridSelect = reactExports.useCallback(
      (index) => {
        setSelection((prev) => {
          const nextIndex = clampItemIndex(index);
          if (prev.focusedPanel === "grid" && prev.itemIndex === nextIndex) {
            return prev;
          }
          return __spreadProps(__spreadValues({}, prev), {
            focusedPanel: "grid",
            itemIndex: nextIndex
          });
        });
      },
      [clampItemIndex]
    );
    const handleGridHighlight = reactExports.useCallback(
      (index) => {
        setSelection((prev) => {
          const nextIndex = clampItemIndex(index);
          if (prev.focusedPanel === "grid" && prev.itemIndex === nextIndex) {
            return prev;
          }
          return __spreadProps(__spreadValues({}, prev), {
            focusedPanel: "grid",
            itemIndex: nextIndex
          });
        });
      },
      [clampItemIndex]
    );
    const handlePlayItem = reactExports.useCallback((item) => {
      if (activeTab === "series" && "series_id" in item) {
        setSelectedSeries(item);
      } else {
        setPlayingItem(item);
      }
    }, [activeTab]);
    const handleEpisodeSelect = reactExports.useCallback((episodeId, episodeTitle, extension) => {
      if (selectedSeries) {
        setPlayingEpisode({
          id: episodeId,
          title: episodeTitle,
          extension,
          series: selectedSeries
        });
        setSelectedSeries(null);
      }
    }, [selectedSeries]);
    const handleSearchItemSelect = reactExports.useCallback((item, type) => {
      setShowSearch(false);
      if (type === "series" && "series_id" in item) {
        setSelectedSeries(item);
      } else {
        setPlayingItem(item);
      }
    }, []);
    const handleFavoriteItemSelect = reactExports.useCallback((item) => {
      setShowFavorites(false);
      const mockItem = {
        stream_id: item.streamId,
        series_id: item.streamId,
        name: item.title
      };
      if (item.type === "series") {
        setSelectedSeries(mockItem);
      } else {
        setPlayingItem(mockItem);
      }
    }, []);
    reactExports.useEffect(() => {
      const handleGlobalKeyDown = (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === "k") {
          event.preventDefault();
          setShowSearch(true);
        }
      };
      window.addEventListener("keydown", handleGlobalKeyDown);
      return () => window.removeEventListener("keydown", handleGlobalKeyDown);
    }, []);
    reactExports.useEffect(() => {
      var _a3;
      if (!credentials || !categories.length) {
        return;
      }
      const categoryId = (_a3 = categories[0]) == null ? void 0 : _a3.category_id;
      if (!categoryId) {
        return;
      }
      console.debug("[dashboard] prefetch first items", { tab: activeTab, categoryId });
      queryClient2.prefetchQuery({
        queryKey: ["items", activeTab, categoryId],
        queryFn: () => __async(this, null, function* () {
          if (activeTab === "movie") {
            const vod = yield fetchVodStreams(credentials, categoryId);
            return vod;
          }
          const series = yield fetchSeries(credentials, categoryId);
          return series;
        }),
        staleTime: 1e3 * 60 * 10
      });
    }, [activeTab, categories, credentials, queryClient2]);
    reactExports.useEffect(() => {
      if (!credentials) {
        return;
      }
      const nextTab = activeTab === "movie" ? "series" : "movie";
      console.debug("[dashboard] prefetch next tab categories", { nextTab });
      prefetchCategories(queryClient2, credentials, nextTab);
    }, [activeTab, credentials, queryClient2]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "dashboard__header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard__title-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: (_f = TABS.find((tab) => tab.type === activeTab)) == null ? void 0 : _f.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard__subtitle-group", children: [
            activeProfile && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "dashboard__profile", children: [
              activeProfile.avatar,
              " ",
              activeProfile.name
            ] }),
            credentials && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "dashboard__subtitle", children: credentials.username })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard__tabs", role: "tablist", children: [
          TABS.map((tab, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              role: "tab",
              "aria-selected": tab.type === activeTab,
              className: activeTab === tab.type ? "tab tab--active" : "tab",
              "data-focused": selection.focusedPanel === "tabs" && index === 0,
              onClick: () => handleTabChange(tab.type),
              children: tab.label
            },
            tab.type
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "dashboard__search-btn",
              type: "button",
              onClick: () => setShowSearch(true),
              title: "Buscar (Ctrl+K)",
              children: "🔍 Buscar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "dashboard__favorites-btn",
              type: "button",
              onClick: () => setShowFavorites(true),
              title: "Meus Favoritos",
              children: "⭐ Favoritos"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "dashboard__profile-btn",
              type: "button",
              onClick: logoutProfile,
              title: "Trocar de perfil",
              children: "👤 Trocar Perfil"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "dashboard__management",
              type: "button",
              onClick: () => setShowManagement(true),
              title: "Gerenciar conta e dados",
              children: "⚙️ Gerenciar"
            }
          )
        ] })
      ] }),
      errorMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dashboard__error", children: errorMessage }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "dashboard__content", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CategoryList,
          {
            categories,
            activeIndex: selection.categoryIndex,
            loading: categoriesQuery.isPending,
            focused: selection.focusedPanel === "categories",
            onFocus: handleCategoryFocus
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MediaGrid,
          {
            items: derivedItems,
            columns,
            focusedIndex: selection.itemIndex,
            loading,
            hasFocus: selection.focusedPanel === "grid",
            onSelect: handleGridSelect,
            onHighlight: handleGridHighlight
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MediaDetails,
          {
            item: focusedItem,
            type: activeTab,
            loading,
            onPlay: handlePlayItem
          }
        )
      ] }),
      selectedSeries && credentials && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SeriesSelector,
        {
          seriesId: selectedSeries.series_id,
          seriesTitle: selectedSeries.name,
          credentials,
          onEpisodeSelect: handleEpisodeSelect,
          onClose: () => setSelectedSeries(null)
        }
      ),
      playingEpisode && credentials && /* @__PURE__ */ jsxRuntimeExports.jsx(
        PlayerOverlay,
        {
          streamId: playingEpisode.id,
          title: playingEpisode.title,
          type: "series",
          credentials,
          onClose: () => setPlayingEpisode(null),
          item: __spreadProps(__spreadValues({}, playingEpisode.series), { container_extension: playingEpisode.extension })
        }
      ),
      playingItem && credentials && activeTab === "movie" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        PlayerOverlay,
        {
          streamId: isVod(playingItem) ? playingItem.stream_id : playingItem.series_id,
          title: playingItem.name,
          type: activeTab,
          credentials,
          onClose: () => setPlayingItem(null),
          item: playingItem
        }
      ),
      showSearch && credentials && /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlobalSearch,
        {
          credentials,
          onClose: () => setShowSearch(false),
          onItemSelect: handleSearchItemSelect
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FavoritesModal,
        {
          isOpen: showFavorites,
          onClose: () => setShowFavorites(false),
          onItemSelect: handleFavoriteItemSelect
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ManagementModal,
        {
          isOpen: showManagement,
          onClose: () => setShowManagement(false)
        }
      )
    ] });
  }
  function prefetchCategories(queryClient2, credentials, type) {
    if (!credentials) {
      return;
    }
    queryClient2.prefetchQuery({
      queryKey: ["categories", credentials.baseUrl, credentials.username, type],
      queryFn: () => fetchCategories(credentials, type)
    });
  }
  function isVod(item) {
    return "stream_id" in item;
  }
  function ProfileSelector() {
    const { profiles, selectProfile, createProfile, updateProfile, deleteProfile } = useProfiles();
    const [showPinModal, setShowPinModal] = reactExports.useState(null);
    const [showCreateModal, setShowCreateModal] = reactExports.useState(false);
    const [showEditModal, setShowEditModal] = reactExports.useState(null);
    const [pin, setPin] = reactExports.useState("");
    const [newProfileName, setNewProfileName] = reactExports.useState("");
    const [newProfileAvatar, setNewProfileAvatar] = reactExports.useState("🦸‍♂️");
    const [newProfilePin, setNewProfilePin] = reactExports.useState("");
    const [error, setError] = reactExports.useState("");
    const getAvatarTitle = (emoji) => {
      const titles = {
        "🦸‍♂️": "Super-herói",
        "🦸‍♀️": "Super-heroína",
        "🕷️": "Aranha",
        "🦇": "Morcego",
        "⚡": "Raio",
        "🛡️": "Escudo",
        "🔥": "Fogo",
        "❄️": "Gelo",
        "🦹‍♂️": "Vilão",
        "🦹‍♀️": "Vilã",
        "💀": "Caveira",
        "🐍": "Serpente",
        "🔮": "Cristal",
        "⚔️": "Espada",
        "💥": "Explosão",
        "🌪️": "Tornado",
        "🧙‍♂️": "Mago",
        "🧙‍♀️": "Maga",
        "🧚‍♂️": "Fada",
        "🧚‍♀️": "Fada",
        "🧝‍♂️": "Elfo",
        "🧝‍♀️": "Elfa",
        "🧛‍♂️": "Vampiro",
        "🧛‍♀️": "Vampira",
        "🤖": "Robô",
        "👽": "Alienígena",
        "🛸": "OVNI",
        "🌌": "Galáxia",
        "🧞‍♂️": "Gênio",
        "🧞‍♀️": "Gênia",
        "⭐": "Estrela",
        "🚀": "Foguete"
      };
      return titles[emoji] || emoji;
    };
    function handleProfileClick(profile) {
      if (profile.pin) {
        setShowPinModal(profile.id);
        setPin("");
        setError("");
      } else {
        selectProfile(profile.id);
      }
    }
    function handlePinSubmit(event) {
      event == null ? void 0 : event.preventDefault();
      if (!showPinModal) return;
      const success = selectProfile(showPinModal, pin);
      if (success) {
        setShowPinModal(null);
        setPin("");
        setError("");
      } else {
        setError("PIN incorreto");
        setPin("");
      }
    }
    function handleCreateProfile(event) {
      event == null ? void 0 : event.preventDefault();
      if (!newProfileName.trim()) {
        setError("Digite um nome para o perfil");
        return;
      }
      createProfile(newProfileName, newProfileAvatar, newProfilePin || void 0);
      setShowCreateModal(false);
      setNewProfileName("");
      setNewProfileAvatar("🦸‍♂️");
      setNewProfilePin("");
      setError("");
    }
    function handleEditProfile() {
      if (!showEditModal) return;
      if (!newProfileName.trim()) {
        setError("Digite um nome para o perfil");
        return;
      }
      updateProfile(showEditModal.id, {
        name: newProfileName,
        avatar: newProfileAvatar,
        pin: newProfilePin || void 0
      });
      setShowEditModal(null);
      setNewProfileName("");
      setNewProfileAvatar("🦸‍♂️");
      setNewProfilePin("");
      setError("");
    }
    function openEditModal(profile) {
      setShowEditModal(profile);
      setNewProfileName(profile.name);
      setNewProfileAvatar(profile.avatar);
      setNewProfilePin(profile.pin || "");
      setError("");
    }
    function handleDeleteProfile(profileId) {
      if (profiles.length <= 1) {
        setError("Deve haver pelo menos um perfil");
        return;
      }
      if (confirm("Tem certeza que deseja excluir este perfil?")) {
        deleteProfile(profileId);
        setShowEditModal(null);
      }
    }
    function handleKeyDown(event, action) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        action();
      }
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-selector", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-selector__container", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "profile-selector__title", children: "Quem está assistindo?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "profile-selector__subtitle", children: [
          profiles.length,
          " ",
          profiles.length === 1 ? "perfil criado" : "perfis criados",
          " • Máximo ",
          8 - profiles.length,
          " ",
          8 - profiles.length === 1 ? "perfil restante" : "perfis restantes"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-selector__grid", children: [
          profiles.map((profile) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-card-container", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                className: "profile-card",
                onClick: () => handleProfileClick(profile),
                onKeyDown: (e) => handleKeyDown(e, () => handleProfileClick(profile)),
                type: "button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "profile-card__avatar", children: profile.avatar }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-card__name", children: profile.name }),
                  profile.pin && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-card__lock", children: "🔒" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "profile-card__edit",
                onClick: (e) => {
                  e.stopPropagation();
                  openEditModal(profile);
                },
                title: "Editar perfil",
                type: "button",
                children: "⚙️"
              }
            )
          ] }, profile.id)),
          profiles.length < 8 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "profile-card-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "profile-card profile-card--add",
              onClick: () => {
                setShowCreateModal(true);
                setError("");
              },
              type: "button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "profile-card__avatar profile-card__avatar--add", children: "+" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-card__name", children: "Adicionar Perfil" })
              ]
            }
          ) })
        ] })
      ] }),
      showPinModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-overlay", onClick: () => setShowPinModal(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal", onClick: (e) => e.stopPropagation(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Digite o PIN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "password",
            inputMode: "numeric",
            pattern: "[0-9]*",
            value: pin,
            onChange: (e) => setPin(e.target.value),
            placeholder: "****",
            autoFocus: true,
            maxLength: 10,
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                handlePinSubmit();
              }
            }
          }
        ),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "modal__error", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal__actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPinModal(null), children: "Cancelar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handlePinSubmit, children: "Entrar" })
        ] })
      ] }) }),
      showCreateModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-overlay", onClick: () => setShowCreateModal(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal", onClick: (e) => e.stopPropagation(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Novo Perfil" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Nome",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: newProfileName,
              onChange: (e) => setNewProfileName(e.target.value),
              placeholder: "Ex: João, Maria...",
              autoFocus: true,
              maxLength: 20
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Avatar",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "avatar-picker", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "avatar-category", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "avatar-category__title", children: "🦸 Heróis" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "avatar-category__items", children: ["🦸‍♂️", "🦸‍♀️", "🕷️", "🦇", "⚡", "🛡️", "🔥", "❄️"].map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: newProfileAvatar === emoji ? "avatar-picker__item avatar-picker__item--active" : "avatar-picker__item",
                  onClick: () => setNewProfileAvatar(emoji),
                  title: getAvatarTitle(emoji),
                  children: emoji
                },
                emoji
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "avatar-category", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "avatar-category__title", children: "🦹 Vilões" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "avatar-category__items", children: ["🦹‍♂️", "🦹‍♀️", "💀", "🐍", "🔮", "⚔️", "💥", "🌪️"].map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: newProfileAvatar === emoji ? "avatar-picker__item avatar-picker__item--active" : "avatar-picker__item",
                  onClick: () => setNewProfileAvatar(emoji),
                  title: getAvatarTitle(emoji),
                  children: emoji
                },
                emoji
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "avatar-category", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "avatar-category__title", children: "🧙 Fantasia" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "avatar-category__items", children: ["🧙‍♂️", "🧙‍♀️", "🧚‍♂️", "🧚‍♀️", "🧝‍♂️", "🧝‍♀️", "🧛‍♂️", "🧛‍♀️"].map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: newProfileAvatar === emoji ? "avatar-picker__item avatar-picker__item--active" : "avatar-picker__item",
                  onClick: () => setNewProfileAvatar(emoji),
                  title: getAvatarTitle(emoji),
                  children: emoji
                },
                emoji
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "avatar-category", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "avatar-category__title", children: "🚀 Sci-Fi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "avatar-category__items", children: ["🤖", "👽", "🛸", "🌌", "🧞‍♂️", "🧞‍♀️", "⭐", "🚀"].map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: newProfileAvatar === emoji ? "avatar-picker__item avatar-picker__item--active" : "avatar-picker__item",
                  onClick: () => setNewProfileAvatar(emoji),
                  title: getAvatarTitle(emoji),
                  children: emoji
                },
                emoji
              )) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "PIN (opcional)",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "password",
              inputMode: "numeric",
              pattern: "[0-9]*",
              value: newProfilePin,
              onChange: (e) => setNewProfilePin(e.target.value),
              placeholder: "Deixe vazio para não usar",
              maxLength: 10
            }
          )
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "modal__error", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal__actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
            setShowCreateModal(false);
            setNewProfileName("");
            setNewProfileAvatar("🦸‍♂️");
            setNewProfilePin("");
            setError("");
          }, children: "Cancelar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleCreateProfile, children: "Criar Perfil" })
        ] })
      ] }) }),
      showEditModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-overlay", onClick: () => setShowEditModal(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal", onClick: (e) => e.stopPropagation(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Editar Perfil" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Nome",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: newProfileName,
              onChange: (e) => setNewProfileName(e.target.value),
              placeholder: "Ex: João, Maria...",
              autoFocus: true,
              maxLength: 20
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Avatar",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "avatar-picker", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "avatar-category", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "avatar-category__title", children: "🦸 Heróis" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "avatar-category__items", children: ["🦸‍♂️", "🦸‍♀️", "🕷️", "🦇", "⚡", "🛡️", "🔥", "❄️"].map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: newProfileAvatar === emoji ? "avatar-picker__item avatar-picker__item--active" : "avatar-picker__item",
                  onClick: () => setNewProfileAvatar(emoji),
                  title: getAvatarTitle(emoji),
                  children: emoji
                },
                emoji
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "avatar-category", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "avatar-category__title", children: "🦹 Vilões" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "avatar-category__items", children: ["🦹‍♂️", "🦹‍♀️", "💀", "🐍", "🔮", "⚔️", "💥", "🌪️"].map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: newProfileAvatar === emoji ? "avatar-picker__item avatar-picker__item--active" : "avatar-picker__item",
                  onClick: () => setNewProfileAvatar(emoji),
                  title: getAvatarTitle(emoji),
                  children: emoji
                },
                emoji
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "avatar-category", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "avatar-category__title", children: "🧙 Fantasia" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "avatar-category__items", children: ["🧙‍♂️", "🧙‍♀️", "🧚‍♂️", "🧚‍♀️", "🧝‍♂️", "🧝‍♀️", "🧛‍♂️", "🧛‍♀️"].map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: newProfileAvatar === emoji ? "avatar-picker__item avatar-picker__item--active" : "avatar-picker__item",
                  onClick: () => setNewProfileAvatar(emoji),
                  title: getAvatarTitle(emoji),
                  children: emoji
                },
                emoji
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "avatar-category", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "avatar-category__title", children: "🚀 Sci-Fi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "avatar-category__items", children: ["🤖", "👽", "🛸", "🌌", "🧞‍♂️", "🧞‍♀️", "⭐", "🚀"].map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: newProfileAvatar === emoji ? "avatar-picker__item avatar-picker__item--active" : "avatar-picker__item",
                  onClick: () => setNewProfileAvatar(emoji),
                  title: getAvatarTitle(emoji),
                  children: emoji
                },
                emoji
              )) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "PIN (opcional)",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "password",
              inputMode: "numeric",
              pattern: "[0-9]*",
              value: newProfilePin,
              onChange: (e) => setNewProfilePin(e.target.value),
              placeholder: "Deixe vazio para não usar",
              maxLength: 10
            }
          )
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "modal__error", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal__actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleDeleteProfile(showEditModal.id),
              className: "modal__delete-btn",
              children: "Excluir"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
            setShowEditModal(null);
            setNewProfileName("");
            setNewProfileAvatar("🦸‍♂️");
            setNewProfilePin("");
            setError("");
          }, children: "Cancelar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleEditProfile, children: "Salvar" })
        ] })
      ] }) })
    ] });
  }
  function AppShell() {
    const { state } = useAuth();
    const { activeProfile } = useProfiles();
    if (!activeProfile) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileSelector, {});
    }
    if (state.status === "authenticating") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-screen", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading-screen__spinner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Carregando catálogo…" })
      ] });
    }
    if (state.status !== "authenticated" || !state.credentials) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginScreen, {});
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {});
  }
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1e3 * 60 * 10,
        gcTime: 1e3 * 60 * 30,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: 1
      },
      mutations: {
        retry: 0
      }
    }
  });
  function App() {
    const client2 = reactExports.useMemo(() => queryClient, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: client2, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, {}) }) }) });
  }
  client.createRoot(document.getElementById("root")).render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
  );
})();
