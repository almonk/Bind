//
//  AppDelegate.m
//  MG
//
//  Created by Tim Debo on 5/19/14.
//
//

#import "AppDelegate.h"
#import "WindowController.h"
#import "WAYWindow.h"

@implementation AppDelegate

- (void)applicationWillFinishLaunching:(NSNotification *)aNotification
{
    // Insert code here to initialize your application
}

-(BOOL)applicationShouldHandleReopen:(NSApplication*)application
                   hasVisibleWindows:(BOOL)visibleWindows{
    if(!visibleWindows){

        [self.windowController.window makeKeyAndOrderFront: nil];
    }
    return YES;
}

- (void) applicationDidFinishLaunching:(NSNotification *)aNotification {
    self.windowController = [[WindowController alloc] initWithURL: kStartPage];
    [self.windowController setWindowParams];
    [self.windowController showWindow:self];
    
    [[NSUserNotificationCenter defaultUserNotificationCenter] setDelegate:self];
}


- (BOOL)userNotificationCenter:(NSUserNotificationCenter *)center
     shouldPresentNotification:(NSUserNotification *)notification
{
    return YES;
}

-(IBAction)openNewWindow:(id)sender {
    NSAlert *alert = [[NSAlert alloc] init];
    [alert addButtonWithTitle:@"Continue"];
    [alert addButtonWithTitle:@"Cancel"];
    [alert setMessageText:@"Alert"];
    [alert setInformativeText:@"You'll lose any unsaved changes in your current document"];
     [alert setAlertStyle:NSWarningAlertStyle];
     [alert beginSheetModalForWindow:self.windowController.window modalDelegate:self didEndSelector:@selector(alertDidEnd:returnCode:contextInfo:) contextInfo:nil];
}

- (void)alertDidEnd:(NSAlert *)alert returnCode:(NSInteger)returnCode contextInfo:(void *)contextInfo
{
    if (returnCode == NSAlertFirstButtonReturn)
    {
        [self.windowController close];
        self.windowController = [[WindowController alloc] initWithURL: kStartPage];
        [self.windowController setWindowParams];
        [self.windowController showWindow:self];
    }
    else if (returnCode == NSCancelButton)
    {
        // Do nothing ^-^
    }
}


-(IBAction)willImportFile:(id)sender {
    [self.windowController willImportFile];
}

-(IBAction)handleSave:(id)sender {
    [self.windowController willSaveFile];
}

-(IBAction)switchToGss:(id)sender {
    [self.windowController switchToGss];
}

-(IBAction)switchToHtml:(id)sender {
    [self.windowController switchToHtml];
}

-(IBAction)switchToCss:(id)sender {
    [self.windowController switchToCss];    
}

-(IBAction)toggleSidebar:(id)sender {
    [self.windowController toggleSidebar:nil];
}

-(IBAction)toggleProperties:(id)sender {
    [self.windowController toggleProperties:nil];
}

-(IBAction)willPlaceImage:(id)sender {
    [self.windowController willPlaceImage:nil];
}

@end
