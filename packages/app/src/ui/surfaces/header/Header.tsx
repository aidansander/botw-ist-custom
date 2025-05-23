import { memo } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";

import { useSessionStore } from "self::application/store";
import { isLessProductive } from "self::pure-contrib";
import { ExtensionsMenu } from "self::ui/surfaces/extension";
import { useStyleEngine } from "self::ui/functions";

import icon from "./icon.svg";
import iconPurple from "./icon-purple.svg";
import { SettingsMenu } from "./SettingsMenu.tsx";
import { PerfMonitor } from "./PerfMonitor.tsx";
import { MiscMenu } from "./MiscMenu.tsx";

const useStyles = makeStyles({
    container: {
        backgroundColor: tokens.colorNeutralBackground2,
        gap: "4px",
        height: "40px",
    },
    logo: {
        width: "40px",
    },
});

const HeaderImpl: React.FC = () => {
    const m = useStyleEngine();
    const c = useStyles();

    const isRunningCustomImage = useSessionStore(
        (state) => state.runningCustomImageVersion,
    );
    return (
        <div className={m("flex-row flex-centera", c.container)}>
            <div className={m("flex flex-center", c.logo)}>
                <img
                    src={isRunningCustomImage ? iconPurple : icon}
                    height="32px"
                />
            </div>
            <SettingsMenu />
            {
                // Custom extensions are limited to PC platform only
                // On other platforms, you can already select all built-in extensions
                // through the extension window toolbar, so there's no need
                // for this menu
                !isLessProductive && <ExtensionsMenu />
            }
            <MiscMenu />
            <div className={m("flex-row flex-1 flex-end")}>
                <PerfMonitor />
            </div>
        </div>
    );
};

export const Header = memo(HeaderImpl);
