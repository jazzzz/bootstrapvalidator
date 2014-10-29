describe('live', function() {
    // Override the options
    $.extend($.fn.bootstrapValidator.DEFAULT_OPTIONS, {
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    });

    beforeEach(function(done) {
        $([
            '<form class="form-horizontal" id="inputForm">',
                '<div class="form-group">',
                    '<textarea name="text" data-bv-notempty placeholder="Text" />',
                '</div>',
                '<div class="form-group">',
                    '<input type="text" name="input1" data-bv-notempty placeholder="Text" />',
                '</div>',
                '<div class="form-group">',
                    '<input type="text" name="input2" data-bv-notempty placeholder="Café" />',
                '</div>',
            '</form>'
        ].join('\n')).appendTo('body');

        $('#inputForm').bootstrapValidator();

        this.bv      = $('#inputForm').data('bootstrapValidator');
        this.$text   = this.bv.getFieldElements('text');
        this.$input1 = this.bv.getFieldElements('input1');
        this.$input2 = this.bv.getFieldElements('input2');
        setTimeout(done, 0);
    });

    afterEach(function() {
        $('#inputForm').bootstrapValidator('destroy').remove();
    });

    // #1040
    it('fields should not be validated on init', function() {
        expect(this.bv.getMessages(this.$text)).toEqual([]);
        expect(this.bv.getMessages(this.$input1)).toEqual([]);
        expect(this.bv.getMessages(this.$input2)).toEqual([]);
    });

    // IE11, see https://connect.microsoft.com/IE/feedback/details/810538/ie-11-fires-input-event-on-focus
    it('fields should not be validated on focus', function() {
        this.$text.focus();
        expect(this.bv.getMessages(this.$text)).toEqual([]);
        this.$input1.focus();
        expect(this.bv.getMessages(this.$input1)).toEqual([]);
        this.$input2.focus();
        expect(this.bv.getMessages(this.$input2)).toEqual([]);
    });

    it('fields should be validated on input', function() {
        this.$input1.val('text');
        this.$input1.trigger("input");
        expect(this.bv.getMessages(this.$input1)).toEqual([]);
        this.$input1.val('');
        this.$input1.trigger("input");
        expect(this.bv.getMessages(this.$input1)).not.toEqual([]);
    });

    it('fields should not be unvalidated on blur', function() {
        this.$input1.focus();
        this.$input1.trigger("input");
        this.$input1.val('text');
        this.$input1.trigger("input");
        this.$input1.val('');
        this.$input1.trigger("input");
        this.$input1.blur();
        expect(this.bv.getMessages(this.$input1)).not.toEqual([]);
    });
});
