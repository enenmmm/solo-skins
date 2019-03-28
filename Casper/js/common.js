/*
 * Solo - A small and beautiful blogging system written in Java.
 * Copyright (c) 2010-2019, b3log.org & hacpai.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
/**
 * @fileoverview util and every page should be used.
 *
 * @author <a href="http://vanessa.b3log.org">Liyuan Li</a>
 * @version 0.1.0.1, Mar 28, 2019
 */

/**
 * @description 皮肤脚本
 * @static
 */
var Skin = {
  init: function () {
    Util.initPjax()
  },
  initArticle: function () {
    page.share()

    var $articleTocs = $('.vditor-reset [id^=b3_solo_h]')
    var $articleToc = $('.article__toc')
    var $articleProgress = $('.article__progress')

    if ($articleToc.length === 1) {
      $('.post__toc').
        css('left', $('.article .item__content').offset().left +
          $('.article .item__content').outerWidth() - 80)
    }

    $(window).unbind('scroll').scroll(function (event) {
      if ($articleProgress.length === 0) {
        return false
      }

      $articleProgress.attr('value', parseInt($(window).scrollTop())).
        attr('max', parseInt($('body').outerHeight() -
          $(window).height()))

      if ($(window).scrollTop() > 236) {
        $('.article__top').css('top', 0)
      } else {
        $('.article__top').css('top', -61)
      }

      if ($('.article__toc li').length === 0 || $(window).width() < 1000) {
        return false
      }

      if ($(window).scrollTop() > 975 && $(window).scrollTop() <
        $('.article').outerHeight() + 100) {
        $('.post__toc').show()
      } else {
        $('.post__toc').hide()
        return
      }

      // 界面各种图片加载会导致帖子目录定位
      var toc = []
      $articleTocs.each(function (i) {
        toc.push({
          id: this.id,
          offsetTop: this.offsetTop,
        })
      })

      // 当前目录样式
      var scrollTop = $(window).scrollTop()
      for (var i = 0, iMax = toc.length; i < iMax; i++) {
        if (scrollTop < toc[i].offsetTop) {
          $articleToc.find('li').removeClass('current')
          var index = i > 0 ? i - 1 : 0
          $articleToc.find('a[href="#' + toc[index].id + '"]').
            parent().
            addClass('current')
          break
        }
      }
      if (scrollTop >= toc[toc.length - 1].offsetTop) {
        $articleToc.find('li').removeClass('current')
        $articleToc.find('li:last').addClass('current')
      }
    })

    $(window).scroll()
  },
}
Skin.init();