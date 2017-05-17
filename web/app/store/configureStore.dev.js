import { createStore } from 'redux';
import { reducers } from '../reducers';
import DevTools from '../containers/DevTools';

export default function configureStore(initialState) {
    const store = createStore(
        reducers,
        initialState,
        DevTools.instrument()
    );

    return store;
}
