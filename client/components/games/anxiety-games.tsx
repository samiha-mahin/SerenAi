"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Flower2, Wind, TreePine, Waves, Music2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BreathingGame } from "./breathing-game";
import { ZenGarden } from "./zen-garden";
import { ForestGame } from "./forest-game";
import { OceanWaves } from "./ocean-waves";

const games = [
  {
    id: "breathing",
    title: "Breathing Patterns",
    description: "Follow calming breathing exercises with visual guidance",
    icon: Wind,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    duration: "5 mins",
  },
  {
    id: "garden",
    title: "Zen Garden",
    description: "Create and maintain your digital peaceful space",
    icon: Flower2,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    duration: "10 mins",
  },
  {
    id: "forest",
    title: "Mindful Forest",
    description: "Take a peaceful walk through a virtual forest",
    icon: TreePine,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    duration: "15 mins",
  },
  {
    id: "waves",
    title: "Ocean Waves",
    description: "Match your breath with gentle ocean waves",
    icon: Waves,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    duration: "8 mins",
  },
];

export const AnxietyGames = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [showGame, setShowGame] = useState(false);

  const handleGameStart = (gameId: string) => {
    setSelectedGame(gameId);
    setShowGame(true);
  };

  const renderGame = () => {
    switch (selectedGame) {
      case "breathing":
        return <BreathingGame />;
      case "garden":
        return <ZenGarden />;
      case "forest":
        return <ForestGame />;
      case "waves":
        return <OceanWaves />;
      default:
        return null;
    }
  };

  return (
    <>
      <Card className="border-[#5bafc7] relative overflow-hidden group lg:col-span-2">
       <div className="absolute inset-0 bg-gradient-to-br from-[#d1f5ff] to-transparent dark:from-[#43656e] to-transparent" />
        <CardContent className="p-6 relative space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-[#5bafc7]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#44889b] dark:text-[#d1f5ff] text-lg">
                Anxiety Relief Activities
              </h3>
              <p className="text-sm text-[#5bafc7]">
                Interactive exercises to help reduce stress and anxiety
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {games.map((game) => (
              <motion.div key={game.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card
                  className={`hover:border-[#5bafc7] bg-white dark:bg-slate-600/30 dark:hover:bg-[#43656e]/20 transition-colors cursor-pointer ${
                    selectedGame === game.id ? "ring-2 ring-[#5bafc7]" : ""
                  }`}
                  onClick={() => handleGameStart(game.id)}
                >
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${game.bgColor} ${game.color}`}>
                      <game.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#44889b] dark:text-[#d1f5ff]">{game.title}</h4>
                      <p className="text-sm text-[#5bafc7] dark:text-[#d1f5ff] mt-1">{game.description}</p>
                      <div className="flex items-center gap-2 mt-3 text-[#5bafc7] dark:text-[#d1f5ff]">
                        <Music2 className="h-4 w-4" />
                        <span className="text-sm">{game.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {selectedGame && (
            <div className="mt-6 text-center">
              <Button
                className="gap-2 bg-gradient-to-r from-[#8BD3E6] to-[#5bafc7] hover:from-[#5bafc7] hover:to-[#8BD3E6] text-white dark:text-[#428294]"
                onClick={() => setSelectedGame(null)}
              >
                <Gamepad2 className="h-4 w-4" />
                Start {games.find((g) => g.id === selectedGame)?.title}
              </Button>
            </div>
          )}
        </CardContent>

        <Dialog open={showGame} onOpenChange={setShowGame}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{games.find((g) => g.id === selectedGame)?.title}</DialogTitle>
            </DialogHeader>
            {renderGame()}
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
};
