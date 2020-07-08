export function login (state,userInfo) {
     state.userInfo = userInfo;
}

export function logout (state) {
     state.userInfo = null;
}

export function where (state, bar) {
     state.back = bar.back || false;
     state.color = bar.color || 'linear-gradient(90deg,#595f69,#2173dc,#696969);';
     state.title = bar.title || 'AgileFlow';
}

