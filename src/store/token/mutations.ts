export function login (state,userInfo) {
     state.userInfo = userInfo;
}

export function logout (state) {
     state.userInfo = null;
}

