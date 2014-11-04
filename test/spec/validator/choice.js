describe('choice', function() {
    beforeEach(function() {
        $([
            '<form class="form-horizontal" id="choiceForm">',
                '<div class="form-group">',
                    '<input type="checkbox" name="group1" value="val1" />',
                '</div>',
                '<div class="form-group">',
                    '<input type="checkbox" name="group1" value="val2" />',
                '</div>',
                '<div class="form-group">',
                    '<input type="checkbox" name="group1" value="val3" />',
                '</div>',
                '<div class="form-group">',
                    '<input type="checkbox" name="group1" value="val4" />',
                '</div>',
                '<div class="form-group">',
                    '<input type="checkbox" name="group1" value="val5" />',
                '</div>',
                '<div class="form-group">',
                    '<input type="checkbox" name="group2" value="val1" />',
                '</div>',
            '</form>'
        ].join('\n')).appendTo('body');

        $('#choiceForm').bootstrapValidator({
            fields: {
                group1: {
                    validators: {
                        choice: {
                            min: 2,
                            max: 3,
                            message: 'Please choose 2 - 3 choices'
                        }
                    }
                },
                group2: {
                    validators: {
                        choice: {
                            min: 1,
                            max: 1,
                            message: 'Please check the checkbox'
                        }
                    }
                }
            }
        });

        this.bv   = $('#choiceForm').data('bootstrapValidator');
    });

    afterEach(function() {
        $('#choiceForm').bootstrapValidator('destroy').remove();
    });

    it('Not enough choices', function() {
        this.bv.resetForm();
        check('group1', 'val1', true);
        this.bv.validate();
        expect(this.bv.isValid()).toBeFalsy();
    });

    it('Enough choices', function() {
        this.bv.resetForm();
        check('group1', 'val1', true);
        check('group1', 'val2', true);
        check('group2', 'val1', true);
        this.bv.validate();
        expect(this.bv.isValid()).toBeTruthy();
    });

    it('Multiple validate', function() {
        this.bv.resetForm();
        check('group1', 'val1', true);
        check('group1', 'val2', true);
        this.bv.validate();
        expect(this.bv.isValid()).toBeFalsy();
        check('group2', 'val1', true);
        this.bv.validate();
        expect(this.bv.isValid()).toBeTruthy();
    });

    it('Too much choices', function() {
        this.bv.resetForm();
        check('group1', 'val1', true);
        check('group1', 'val2', true);
        check('group1', 'val3', true);
        check('group1', 'val4', true);
        check('group2', 'val1', true);
        this.bv.validate();
        expect(this.bv.isValid()).toBeFalsy();
    });

    function check(name, value, checked) {
        $('input[name='+name+'][value='+value+']')
            .prop('checked', true)
            .trigger('change');
    }
});
