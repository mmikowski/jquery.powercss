/*
 * powercss.js
 * Base class for JS-driven CSS
 *
 * Michael S. Mikowski - mike.mikowski@gmail.com
 */
/*jslint       browser : true, continue : true,
 devel : true,  indent : 2,      maxerr : 50,
 newcap : true,  nomen : true, plusplus : true,
 regexp : true, sloppy : true,     vars : false,
 white : true,    todo : true,  unparam : true
 */
/*global jQuery, ao*/

var pcss = (function () {
  var
    vMap = {
      _appendChild_    : 'appendChild',
      _createElement_  : 'createElement',
      _createTextNode_ : 'createTextNode',
      _cssText_        : 'cssText',
      _disabled_       : 'disabled',
      _hasOwnProp_     : 'hasOwnProperty',
      _head_           : 'head',
      _id_             : 'id',
      _innerText_      : 'innerText',
      _join_           : 'join',
      _length_         : 'length',
      _push_           : 'push',
      _textContent_    : 'textContent',
      _text_           : 'text',
      _text_css_       : 'text/css'
    },
    __blank     = '',
    __false     = false,
    __docRef    = document,
    __isArray   = Array.isArray,
    __logError  = console.error,
    __0         = 0,

    cssKeyMap, cssValMap,
    makeSheetStr,

    addMetaSheet,
    updateMetaSheet
    ;

  cssKeyMap = {
    __moz_box_sizing_    : '-moz-box-sizing',
    __webkit_overflow_scrolling_ : '-webkit-overflow-scrolling',
    __webkit_user_select_ : '-webkit-user-select',
    __moz_user_select_    : '-moz-user-select',
    __o_user_select_      : '-o-user-select',
    _user_select_         : 'user_select',

    _animation_        : 'animation',
    _background_       : 'background',
    _background_color_ : 'background-color',
    _background_image_ : 'background-image',
    _background_position_ : 'background-position',
    _background_repeat_: 'background-repeat',
    _background_size_  : 'background-size',
    _baseline_         : 'baseline',
    _body_             : 'body',
    _border_           : 'border',
    _border_btm_       : 'border-bottom',
    _border_btm_color_ : 'border-bottom-color',
    _border_btm_width_ : 'border-bottom-width',
    _border_collapse_  : 'border-collapse',
    _border_color_     : 'border-color',
    _border_left_      : 'border-left',
    _border_left_color_: 'border-left-color',
    _border_left_width_: 'border-left-width',
    _border_radius_    : 'border-radius',
    _border_right_     : 'border-right',
    _border_right_color_: 'border-right-color',
    _border_right_width_ : 'border-right-width',
    _border_spacing_   : 'border-spacing',
    _border_style_     : 'border-style',
    _border_top_       : 'border-top',
    _border_top_width_ : 'border-top-width',
    _border_top_color_ : 'border-top-color',
    _border_top_left_radius_ : 'border-top-left-radius',
    _border_width_     : 'border-width',
    _bottom_           : 'bottom',
    _box_shadow_       : 'box-shadow',
    _box_sizing_       : 'box-sizing',
    _clear_            : 'clear',
    _clip_             : 'clip',
    _color_            : 'color',
    _cursor_           : 'cursor',
    _display_          : 'display',
    _empty_cells_      : 'empty_cells',
    _fill_             : 'fill',
    _float_            : 'float',
    _font_family_      : 'font-family',
    _font_size_        : 'font-size',
    _font_style_       : 'font-style',
    _font_weight_      : 'font-weight',
    _height_           : 'height',
    _left_             : 'left',
    _line_height_      : 'line-height',
    _list_style_type_  : 'list-style-type',
    _list_style_position_ : 'list-style-position',
    _margin_           : 'margin',
    _max_height_       : 'max-height',
    _max_width_        : 'max-width',
    _margin_btm_       : 'margin-bottom',
    _margin_left_      : 'margin-left',
    _margin_right_     : 'margin-right',
    _margin_top_       : 'margin-top',
    _min_height_       : 'min-height',
    _min_width_        : 'min-width',
    _opacity_          : 'opacity',
    _outline_          : 'outline',
    _overflow_         : 'overflow',
    _overflow_x_       : 'overflow-x',
    _overflow_y_       : 'overflow-y',
    _padding_          : 'padding',
    _padding_btm_      : 'padding-bottom',
    _padding_left_     : 'padding-left',
    _padding_right_    : 'padding-right',
    _padding_top_      : 'padding-top',
    _position_         : 'position',
    _resize_           : 'resize',
    _right_            : 'right',
    _src_              : 'src',
    _stroke_           : 'stroke',
    _stroke_opacity_   : 'stroke-opacity',
    _stroke_width_     : 'stroke-width',
    _text_align_       : 'text-align',
    _text_decoration_  : 'text-decoration',
    _text_indent_      : 'text-indent',
    _text_overflow_    : 'text-overflow',
    _top_              : 'top',
    _transition_       : 'transition',
    _vertical_align_   : 'vertical-align',
    _visibility_       : 'visibility',
    _webkit_font_smoothing_ : '-webkit-font-smoothing',
    _white_space_      : 'white-space',
    _width_            : 'width',
    _z_index_          : 'z-index'
  };
  // css keyword values
  cssValMap = {
    __moz_none_    : '-moz-none',
    _0_            : '0',
    _1_            : '1',
    _1rem_         : '1rem',
    _2rem_         : '2rem',
    _3rem_         : '3rem',
    _50p_          : '50%',
    _100p_         : '100%',
    _400_          : '400',
    _800_          : '800',
    _xfff_         : '#fff',
    _absolute_     : 'absolute',
    _antialiased_  : 'antialiased',
    _auto_         : 'auto',
    _block_        : 'block',
    _border_box_   : 'border-box',
    _both_         : 'both',
    _center_       : 'center',
    _clip_         : 'clip',
    _collapse_     : 'collapse',
    _contain_      : 'contain',
    _content_box_  : 'content-box',
    _cover_        : 'cover',
    _default_      : 'default',
    _disc_         : 'disc',
    _ellipsis_     : 'ellipsis',
    _fixed_        : 'fixed',
    _font_fixed_   : 'courier, fixed',
    _font_sans_    : 'helvetica, arial, sans-serif',
    _hidden_       : 'hidden',
    _important_    : ' !important',
    _inherit_      : 'inherit',
    _inline_block_ : 'inline-block',
    _italic_       : 'italic',
    _left_         : 'left',
    _line_through_ : 'line-through',
    _middle_       : 'middle',
    _move_         : 'move',
    _no_repeat_    : 'no-repeat',
    _none_         : 'none',
    _normal_       : 'normal',
    _nowrap_       : 'nowrap',
    _outside_      : 'outside',
    _pointer_      : 'pointer',
    _relative_     : 'relative',
    _right_        : 'right',
    _show_         : 'show',
    _solid_        : 'solid',
    _text_         : 'text',
    _top_          : 'top',
    _touch_        : 'touch',
    _transparent_  : 'transparent',
    _underline_    : 'underline',
    _uppercase_    : 'uppercase',
    _vertical_     : 'vertical'
  };

  makeSheetStr = function ( sheetSelectList ) {
    var select_count, i, pkg_map,
      select_str, rule_map, close_str,
      rule_key_list, rule_key_count,
      j, rule_key, rule_val, rule_val_type,

      solved_select_list,
      solved_rule_list,
      solved_key,
      solved_val,
      solved_select_str,
      solvedSheetStr
      ;

    select_count = sheetSelectList[ vMap._length_ ];

    solved_select_list = [];
    for ( i = __0; i < select_count; i++ ) {
      pkg_map  = sheetSelectList[ i ];
      select_str = pkg_map._select_str_;
      rule_map   = pkg_map._rule_map_;
      close_str  = pkg_map._close_str_;

      if ( ! rule_map ) {
        solved_select_list[ vMap._push_]( select_str );
        continue;
      }

      rule_key_list  = Object.keys( rule_map );
      rule_key_count = rule_key_list[ vMap._length_ ];

      solved_rule_list = [];
      for ( j = __0; j < rule_key_count; j++ ) {

        // Calc solved_key
        rule_key = rule_key_list[ j ];
        if ( cssKeyMap[ vMap._hasOwnProp_ ]( rule_key ) ) {
          solved_key = cssKeyMap[ rule_key ];
        }
        else {
          __logError( rule_key, '_css_rule_key_not_found_' );
          continue;
        }

        // Calc solve val
        rule_val = rule_map[ rule_key ];
        rule_val_type = typeof rule_val;
        if ( rule_val_type === 'object' && __isArray( rule_val_type ) ) {
          rule_val_type = 'array';
        }
        switch( rule_val_type ) {
          case 'string' :
            if ( cssValMap[ vMap._hasOwnProp_ ]( rule_val ) ) {
              solved_val = cssValMap[ rule_val ];
            }
            else {
              __logError( rule_val, '_css_rule_val_not_found_' );
            }
            break;
          case 'array' :
            if ( rule_val[ vMap._length_ ] > __0 ) {
              solved_val = rule_val[ __0 ];
            }
            else {
              __logError( rule_val, '_empty_array_' );
            }
            break;
          default :
            __logError( '_css_values_must_be_str_or_ary_' );
            break;
        }

        // Store rule string
        solved_rule_list[ vMap._push_ ](
          solved_key + ':' + solved_val
        );
      }

      // Construct selector and store
      solved_select_str = select_str + '{'
        + solved_rule_list[ vMap._join_ ](';') + '}'
        ;
      if ( close_str ) { solved_select_str += close_str; }

      solved_select_list[ vMap._push_]( solved_select_str );
    }

    // Join all selectors for sheet
    solvedSheetStr = solved_select_list[ vMap._join_ ]( __blank );
    return solvedSheetStr;
  };

  addMetaSheet = function ( sheet_id, sheet_select_list, do_force ) {
    // TODO check if id '<name>-0' and <name>-1' double buffer sheets
    // already exist.  If so, fail.
    var
      head_el   = __docRef[ vMap._head_ ],
      style_el  = __docRef[ vMap._createElement_]( 'style' ),
      style_str = makeSheetStr( sheet_select_list )
      ;

    style_el[ vMap._setAttribute_ ]( vMap._type_,     vMap._text_css_ );
    style_el[ vMap._setAttribute_ ]( vMap._id_,       sheet_id        );
    style_el[ vMap._setAttribute_ ]( vMap._disabled_, __false         );

    // Firefox and IE
    // TODO: test in IE
    if ( style_el[ vMap._hasOwnProp_ ]( vMap._cssText_ ) ) {
      style_el[ vMap._cssText_   ] = style_str;
    }
    // Newer Firefox
    else if ( style_el[ vMap._hasOwnProp_ ]( vMap._textContent_ ) ) {
      style_el[ vMap._textContent_ ] = style_str;
    }
    // Webkit
    else {
      __docRef[ vMap._createTextNode_ ] = __blank;
      style_el[ vMap._innerText_      ] = style_str;
    }
    head_el[ vMap._appendChild_ ]( style_el );
  };

  updateMetaSheet = function ( sheet_id, sheet_select_list ) {
    // TODO check if id '<name>-0' and <name>-1' double buffer sheets
    // already exist.  If not, fail
    __logError( 'TODO' );
  };

  return {
    _addMetaSheet_    : addMetaSheet,
    _updateMetaSheet_ : updateMetaSheet
  };
}());
