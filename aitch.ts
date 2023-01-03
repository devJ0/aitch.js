let h_shift,h_ctrl,h_alt,h_tab,h_windows,h_esc,h_upArrow,h_downArrow,h_leftArrow,h_rightArrow,h_enter,h_back,h_f1,h_f2,h_f3,h_f4,h_f5,h_f6,h_f7,h_f8,h_f9,h_f10,h_f11,h_f12,h_printScreen,h_srcollLock,h_pauseBreak,h_numLock,h_q,h_w,h_e,h_r,h_t,h_y,h_u,h_i,h_o,h_p,h_a,h_s,h_d,h_f,h_g,h_h,h_j,h_k,h_l,h_z,h_x,h_c,h_v,h_b,h_n,h_m,h_comma,h_dot,h_semicolon,h_slash,h_quotation,h_leftSquareBrackets,h_rightSquareBrackets,h_backslash,h_capslock: boolean = false;

window.onkeydown = (e) => {
    switch(e.keyCode) {
        case 9: // Tab
            h_tab = true;
            break;
        case 81: // Q
            h_q = true;
            break;
        case 87: // W
            h_w = true;
            break;
        case 69: // E
            h_e = true;
            break;
        case 82: // R
            h_r = true;
            break;
        case 84: // T
            h_t = true;
            break;
        case 89: // Y
            h_y = true;
            break;
        case 85: // U
            h_u = true;
            break;
        case 73: // I
            h_i = true;
            break;
        case 79: // O
            h_o = true;
            break;
        case 80: // P
            h_p = true;
            break;
        case 219: // [
            h_leftSquareBrackets = true;
            break;
        case 221: // ]
            h_rightSquareBrackets = true;
            break;
        case 20: // Casp Lock
            h_capslock = true;
            break;
        case 16: // Shift
            h_shift = true;
            break;
        case 17: // Ctrl
            h_ctrl = true;
            break
        case 18: // Alt
            h_alt = true;
            break;
        default:
            break
    }
    console.log(h_ctrl, h_alt)
};
window.onkeyup = (e) => {
    switch(e.keyCode) {
        case 9: // Tab
            h_tab = false;
            break;
        case 16: // Shift
            h_shift = false;
            break;
        case 17: // Ctrl
            h_ctrl = false;
            break
        case 18: // Alt
            h_alt = false;
            break;
        default:
            break
    }
    console.log(h_ctrl, h_alt)
};