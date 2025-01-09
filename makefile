target:
	$(info ${HELP_MESSAGE})
	@exit 0

angular-update-wrapper:
	ng update @angular/core@latest @angular/cli@latest

clarity-update-wrapper:
	ng update @clr/ui @cds/core


define HELP_MESSAGE

Usage: $ make [TARGETS]

TARGETS
	angular-update-wrapper        Updates the angular version of the wrapper project
	clarity-update-wrapper        Updates the clarity version of the wrapper project

endef
